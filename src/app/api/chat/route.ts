import { NextRequest, NextResponse } from 'next/server';
import { getServices, getSolutions, getProjects, getCompanyProfile, getProcessSteps } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required.' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content?.trim();
    if (!latestMessage) {
      return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400 });
    }

    // Fetch active CMS knowledge dynamically
    const [profile, services, solutions, projects, processSteps] = await Promise.all([
      getCompanyProfile(),
      getServices(),
      getSolutions(),
      getProjects(),
      getProcessSteps()
    ]);

    // Build structured context from active CMS data
    const servicesText = services
      .filter((s) => s.is_enabled)
      .map(
        (s) => `- ${s.title}: ${s.short_description || s.description || ''} (Features: ${s.features?.join(', ') || 'Custom architecture'}; Tech: ${s.technologies?.join(', ') || 'Modern full-stack'})`
      )
      .join('\n');

    const solutionsText = solutions
      .filter((s) => s.is_enabled)
      .map(
        (s) => `- ${s.title}: ${s.description || ''} (Features: ${s.features?.join(', ') || ''}; Use Cases: ${s.use_cases?.join(', ') || ''})`
      )
      .join('\n');

    const projectsText = projects
      .map((p) => `- ${p.name} (${p.project_type || 'Software'}): ${p.short_description || ''}`)
      .join('\n');

    const processText = processSteps
      .map((st) => `- Step ${st.display_order}: ${st.title} - ${st.description || ''}`)
      .join('\n');

    const systemPrompt = `You are "TechKnox AI", a friendly and consultative technology specialist for TechKnox.

IDENTITY & MISSION:
- TechKnox is a technology agency that engineers custom web applications, mobile apps, software tools, AI automation systems, API integrations, and internal dashboards.
- Brand tagline: "${profile.tagline || 'We build the technology your business needs.'}"
- Your ONLY purpose is to discuss what TechKnox does, understand a visitor's business requirements, suggest suitable services or technology architectures, and guide them on how TechKnox can solve their operational bottlenecks.
- You are NOT a general-purpose AI.

CURRENT TECHKNOX SERVICES (SOURCE OF TRUTH):
${servicesText}

CURRENT TECHKNOX BUSINESS SOLUTIONS:
${solutionsText}

PORTFOLIO & CASE STUDIES:
${projectsText}

HOW WE WORK (PROCESS):
${processText}

CONTACT & INTAKE:
- Contact Email: ${profile.email || 'techknoxin@gmail.com'}
- Visitors can submit a project scoping intake at "/request-a-solution" or reach out at "/contact".

CONVERSATION GUIDELINES:
1. Respond naturally, concisely, and conversationally.
2. When a visitor describes their business or problem (e.g. "I need an application for my restaurant" or "I want to automate invoices"), explain how TechKnox would approach building it (key features, user portal, admin dashboard, automations) and ask helpful follow-up questions to understand their exact workflow needs.
3. Do NOT repeatedly list all services. Be specific to what the user asks.
4. Do NOT invent services, guarantees, specific pricing, certifications, or fictional client names.
5. If the visitor asks questions unrelated to software development, TechKnox services, or business technology (e.g., general trivia, recipes, math problems, unrelated coding tutorials), politely decline with:
"I'm here to help with TechKnox's services and technology solutions. What are you looking to build or automate?"
6. Keep formatting clean with concise paragraphs or short bullet points.`;

    const rawGeminiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GEMINI_KEY;
    const geminiApiKey = rawGeminiKey ? rawGeminiKey.trim() : null;

    const rawOpenAiKey = process.env.OPENAI_API_KEY;
    const openaiApiKey = rawOpenAiKey ? rawOpenAiKey.trim() : null;

    // 1. If Gemini API Key is available
    if (geminiApiKey) {
      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // Try primary active models (gemini-3.6-flash, gemini-3.7-flash, gemini-3.5-flash)
      const modelsToTry = ['gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
      let lastErrText = '';

      for (const modelName of modelsToTry) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiApiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: systemPrompt }]
                },
                contents: formattedContents,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 800
                }
              })
            }
          );

          if (res.ok) {
            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              return NextResponse.json({ reply });
            }
          } else {
            lastErrText = await res.text();
            console.warn(`Gemini model ${modelName} returned status ${res.status}`);
          }
        } catch (modelErr) {
          console.warn(`Error trying Gemini model ${modelName}:`, modelErr);
        }
      }

      console.error('All Gemini model attempts failed. Last error:', lastErrText);
    }

    // 2. If OpenAI API Key is available
    if (openaiApiKey) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content
            }))
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return NextResponse.json({ reply });
        }
      } else {
        const errText = await res.text();
        console.error('OpenAI API error:', errText);
      }
    }

    // 3. Fallback when no API key is set in environment
    return NextResponse.json({
      reply: `Thank you for reaching out! TechKnox specializes in custom web and mobile applications, AI automation, API integrations, software systems, and business dashboards.

To activate real-time AI responses with the live Gemini model, please configure the \`GEMINI_API_KEY\` environment variable in your \`.env.local\`.

In the meantime, feel free to explore our [Services](/services) or submit your project requirements via our [Request a Solution](/request-a-solution) page!`,
      isFallback: true
    });
  } catch (error) {
    console.error('Chat API unexpected error:', error);
    return NextResponse.json(
      {
        reply: "I'm having trouble connecting to the service at the moment. Please feel free to reach out directly via our [Contact Page](/contact) or submit a [Solution Request](/request-a-solution)."
      },
      { status: 500 }
    );
  }
}
