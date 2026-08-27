import { CompanyProfile, Service, Solution, Project, ProcessStep, LegalPage } from './types';

export const defaultCompanyProfile: CompanyProfile = {
  brand_name: 'TechKnox',
  tagline: 'We build the technology your business needs.',
  short_description:
    'TechKnox is a technology agency that engineers custom web applications, AI automation, API integrations, software systems, and internal business tools tailored to your exact operational requirements.',
  full_description:
    'TechKnox helps forward-thinking companies solve operational friction and build modern digital capabilities. We take a problem-first approach to software development, designing and building custom websites, web applications, mobile apps, workflow automations, third-party integrations, and AI systems that deliver measurable business outcomes.',
  email: 'techknoxin@gmail.com',
  phone: null,
  whatsapp: null,
  address: null,
  location: null,
  city: null,
  country: null,
  website: 'https://techknox.dev',
  linkedin_url: 'https://linkedin.com/company/techknox',
  github_url: 'https://github.com/techknox',
  instagram_url: 'https://instagram.com/techknox.dev',
  twitter_url: 'https://x.com/techknoxdev',
  business_hours: 'Monday – Friday: 9:00 AM – 6:00 PM (Client Timezones Supported)',
  contact_cta: 'Start a Project',
  footer_description:
    'Engineering custom digital solutions, intelligent automations, and resilient software systems for businesses worldwide.',
  legal_entity_name: null,
  registration_number: null,
  tax_id: null,
  registered_address: null
};

export const sampleServices: Service[] = [
  {
    id: 'srv-web-app',
    title: 'Web & App Development',
    slug: 'web-app-development',
    short_description:
      'High-performance web applications, responsive client portals, modern websites, and cross-platform mobile apps built with clean architecture.',
    description:
      'We build scalable, secure, and intuitive web and mobile applications tailored to your business model. Whether you need a customer-facing portal, an enterprise SaaS application, or a cross-platform mobile app, our team implements modern engineering best practices from database design to frontend UX.',
    icon: 'code',
    features: [
      'Custom Full-Stack Web Applications (Next.js, React, Node.js, Python)',
      'Cross-Platform Mobile Apps (React Native / iOS & Android)',
      'Customer & Vendor Portals with Role-Based Access Control',
      'Progressive Web Apps (PWAs) with Offline Capability',
      'Database Architecture & High-Performance SQL/NoSQL Systems',
      'Headless CMS & High-Speed Performance Optimization'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Redis', 'Docker'],
    benefits: [
      'Engineered specifically for your unique workflows, not constrained by generic templates',
      'Lightning-fast load times and high Core Web Vitals performance',
      'Modular architecture ready for future feature expansion without technical debt',
      'Secure authentication, data encryption, and role-based permissions'
    ],
    process: [
      { step: '01', title: 'Requirements & Architecture', description: 'Deep dive into user journeys, edge cases, data flows, and technical stack selection.' },
      { step: '02', title: 'UI/UX & Wireframing', description: 'Designing intuitive, accessible, and responsive interfaces focused on conversion and usability.' },
      { step: '03', title: 'Agile Development', description: 'Building the core application in rapid, reviewable milestones with continuous integration.' },
      { step: '04', title: 'Testing & QA', description: 'Rigorous cross-device testing, performance audits, and security vulnerability checks.' },
      { step: '05', title: 'Production Deployment & SLA', description: 'Zero-downtime deployment, automated backups, and post-launch monitoring.' }
    ],
    faq: [
      { question: 'Do you build native or cross-platform mobile apps?', answer: 'We primarily build cross-platform mobile apps using React Native and modern frameworks to ensure consistent performance, faster delivery, and unified codebase maintenance across both iOS and Android.' },
      { question: 'Who owns the intellectual property and code?', answer: 'You own 100% of the custom source code, assets, database schemas, and intellectual property developed for your project upon final milestone completion.' },
      { question: 'Can you integrate with our existing backend or database?', answer: 'Yes. We frequently build modern frontends and client portals that seamlessly connect to legacy databases, custom REST/GraphQL APIs, or ERP backends.' }
    ],
    cta_label: 'Discuss Your Web or App Project',
    is_enabled: true,
    display_order: 1
  },
  {
    id: 'srv-ai-automation',
    title: 'AI & Automation',
    slug: 'ai-automation',
    short_description:
      'Practical AI assistants, intelligent document processing, automated lead triage, and custom business process workflows that eliminate manual friction.',
    description:
      'We design and deploy practical, high-ROI AI and automation systems focused on solving genuine business bottlenecks. Rather than chasing generic AI hype, we implement tailored AI chatbots, intelligent search over private business documentation, automated data extraction, and end-to-end workflow automations.',
    icon: 'sparkles',
    features: [
      'Domain-Specific AI Chatbots & Intelligent Support Agents',
      'Document Intelligence (OCR, Automated Invoice & PDF Extraction)',
      'Automated Lead Qualification & WhatsApp / Email Follow-Ups',
      'Natural Language Data Querying & Knowledge Base Search (RAG)',
      'Automated Multi-Step Business Workflows (n8n, Make, Custom Python)',
      'Intelligent Internal Tools & Operations Automation'
    ],
    technologies: ['OpenAI API', 'Anthropic Claude', 'LangChain', 'Python', 'Vector DBs (pgvector/Pinecone)', 'n8n', 'Zapier', 'Whisper', 'FastAPI'],
    benefits: [
      'Eliminate dozens of hours spent on repetitive manual data entry and document review',
      '24/7 instant customer qualification and automated routing without extra headcount',
      'Data stays private, secure, and never leaks into public AI model training sets',
      'Measurable reduction in human turnaround time and clerical error rates'
    ],
    process: [
      { step: '01', title: 'Bottleneck Audit', description: 'Mapping your manual workflows to identify high-impact, automatable tasks.' },
      { step: '02', title: 'Model & Logic Design', description: 'Selecting appropriate AI models, structuring prompts, and defining fallbacks.' },
      { step: '03', title: 'Custom Tool & Pipeline Build', description: 'Developing the connectors, vector stores, and automated execution queues.' },
      { step: '04', title: 'Evaluation & Safeguards', description: 'Stress-testing edge cases, hallucination guards, and error routing protocols.' },
      { step: '05', title: 'Production Rollout', description: 'Deploying with real-time logs, analytics, and human-in-the-loop override controls.' }
    ],
    faq: [
      { question: 'Will our business data be used to train public AI models?', answer: 'No. We use enterprise-grade API endpoints with strict zero-data-retention and zero-training policies to guarantee complete confidentiality.' },
      { question: 'What if the AI model makes a mistake?', answer: 'We engineer deterministic validation rules, confidence score thresholds, and automated human-in-the-loop escalation paths for edge cases.' },
      { question: 'Can you automate our existing email and spreadsheet workflows?', answer: 'Yes. We regularly build pipelines that parse incoming emails/attachments, validate data against internal systems, and update spreadsheets or databases automatically.' }
    ],
    cta_label: 'Automate Your Workflows',
    is_enabled: true,
    display_order: 2
  },
  {
    id: 'srv-api-integration',
    title: 'API Integration',
    slug: 'api-integration',
    short_description:
      'Seamlessly connect payment gateways, CRMs, ERPs, WhatsApp Business, AI APIs, accounting software, and third-party SaaS platforms.',
    description:
      'Silos slow down operations. TechKnox specializes in custom API integrations and middleware that synchronize data bidirectionally between your existing tools. We build robust, webhook-driven pipelines that connect your payment gateways, communication channels, ERPs, CRMs, and custom internal systems.',
    icon: 'plug',
    features: [
      'Payment Gateway Integration (Stripe, Razorpay, PayPal, Bank Webhooks)',
      'CRM Synchronization (HubSpot, Salesforce, Zoho, Pipedrive)',
      'WhatsApp Business API & Twilio Communication Automation',
      'ERP & Accounting Connectors (QuickBooks, Xero, SAP, NetSuite)',
      'E-commerce Platform Integration (Shopify, WooCommerce, Custom Storefronts)',
      'Custom Webhook Handlers, Queue Workers, and Event-Driven Middleware'
    ],
    technologies: ['REST APIs', 'GraphQL', 'Webhooks', 'Stripe API', 'WhatsApp API', 'HubSpot API', 'Node.js', 'Python', 'Redis Queue', 'Postman'],
    benefits: [
      'Single source of truth across sales, accounting, fulfillment, and support',
      'Eliminate copy-pasting data between disconnected software applications',
      'Instant real-time event triggers (e.g. order placed → invoice generated → WhatsApp sent)',
      'Automatic retry logic, rate limit handling, and dead-letter queue recovery'
    ],
    process: [
      { step: '01', title: 'API Audit & Schema Mapping', description: 'Inspecting endpoints, rate limits, authentication protocols, and payload schemas.' },
      { step: '02', title: 'Middleware Architecture', description: 'Designing event buses, webhooks, idempotency keys, and transformation logic.' },
      { step: '03', title: 'Connector Engineering', description: 'Building resilient API handlers with exponential backoff and error tracking.' },
      { step: '04', title: 'End-to-End Simulation', description: 'Simulating payload spikes, dropped webhooks, and third-party downtime behavior.' },
      { step: '05', title: 'Live Synchronization', description: 'Enabling bidirectional live sync with health check telemetry and alert alarms.' }
    ],
    faq: [
      { question: 'Are you official partners with all these platforms?', answer: 'We specialize in engineering third-party platform integrations using their official public APIs and developer SDKs. We do not claim official corporate partnerships unless explicitly verified.' },
      { question: 'What happens if a third-party API goes down?', answer: 'We implement persistent queueing (Redis / database event buffers) with automatic retry algorithms so no transaction or webhook payload is ever lost.' },
      { question: 'Can you connect legacy software that does not have modern REST APIs?', answer: 'Yes. We build custom database bridges, SFTP automated ingestors, or scraping/webhook middleware for systems without modern APIs.' }
    ],
    cta_label: 'Connect Your Systems',
    is_enabled: true,
    display_order: 3
  },
  {
    id: 'srv-custom-software',
    title: 'Custom Software',
    slug: 'custom-software',
    short_description:
      'Purpose-built software systems, specialized operational tools, backend architectures, and database infrastructure designed around your business logic.',
    description:
      'When off-the-shelf SaaS fails to match how your business operates, TechKnox engineers custom software from the ground up. We build modular, secure backends, custom calculation engines, multi-tenant databases, and operational software that gives you full autonomy and control.',
    icon: 'terminal',
    features: [
      'Bespoke Backend Engineering (Node.js, Go, Python, Next.js)',
      'Multi-Tenant Database Architecture & Data Isolation',
      'Custom Calculation, Pricing, and Booking Engines',
      'Role-Based Permission Matrix (RBAC) & Audit Logging',
      'Cloud Infrastructure Architecture (AWS, GCP, Vercel, Supabase)',
      'Legacy Software Refactoring & Modernization'
    ],
    technologies: ['TypeScript', 'Python', 'Go', 'PostgreSQL', 'Supabase', 'Docker', 'AWS', 'Vercel', 'Prisma', 'REST/gRPC'],
    benefits: [
      'Zero recurring per-user SaaS license fee penalties as your team scales',
      '100% customized to your exact operational workflows and compliance requirements',
      'Full data sovereignty and complete ownership of your intellectual property',
      'Built to scale gracefully from day one without architectural bottlenecks'
    ],
    process: [
      { step: '01', title: 'System Specification', description: 'Drafting data models, state machines, user roles, and security boundaries.' },
      { step: '02', title: 'Database & API Scaffolding', description: 'Creating robust schemas, indexes, migrations, and typed API endpoints.' },
      { step: '03', title: 'Core Logic Implementation', description: 'Writing clean, thoroughly tested business logic and execution pipelines.' },
      { step: '04', title: 'Security & Stress Testing', description: 'Conducting penetration tests, query optimization, and latency analysis.' },
      { step: '05', title: 'Deployment & Maintenance', description: 'Provisioning production cloud infrastructure with automated CI/CD.' }
    ],
    faq: [
      { question: 'How is custom software better than paying for off-the-shelf SaaS?', answer: 'Commercial SaaS forces your company into their pre-set workflows and charges escalating monthly fees per user. Custom software gives you full control, custom workflows, and owned IP with no per-seat tax.' },
      { question: 'Do you provide ongoing support after launch?', answer: 'Yes. We offer maintenance packages covering security updates, performance monitoring, feature expansions, and technical SLA response.' }
    ],
    cta_label: 'Build Custom Software',
    is_enabled: true,
    display_order: 4
  },
  {
    id: 'srv-dashboards',
    title: 'Business Dashboards',
    slug: 'business-dashboards',
    short_description:
      'Real-time business intelligence, executive KPI dashboards, operational trackers, and interactive reporting tools connected directly to your data.',
    description:
      'Make informed business decisions with fast, real-time dashboards that aggregate data from multiple spreadsheets, payment gateways, and databases into a single pane of glass. We build clean, responsive data visualizations tailored to executives, operations teams, and department heads.',
    icon: 'chart',
    features: [
      'Real-Time KPI & Revenue Tracking Dashboards',
      'Operational Monitoring & SLA Performance Metrics',
      'Custom Filtering, Date-Range Slicing, and CSV/PDF Exporting',
      'Multi-Source Data Aggregation (Stripe + CRM + Database)',
      'Role-Based Executive vs. Team View Access Control',
      'Automated Scheduled PDF/Email Digest Reports'
    ],
    technologies: ['Next.js', 'React', 'Tremor', 'Chart.js', 'Recharts', 'PostgreSQL', 'ClickHouse', 'Tailwind CSS'],
    benefits: [
      'Instant visibility into core business metrics without waiting for manual weekly reports',
      'Identify operational bottlenecks and revenue trends before they impact your bottom line',
      'Interactive filtering and drill-down capabilities for deep investigative analysis',
      'Accessible on desktop, tablet, and mobile with high responsiveness'
    ],
    process: [
      { step: '01', title: 'Metrics Discovery', description: 'Defining the exact KPIs, formulas, and data sources that drive your business.' },
      { step: '02', title: 'Data Pipeline Design', description: 'Structuring aggregations, materialized views, and fast query pipelines.' },
      { step: '03', title: 'Interface & Chart UX', description: 'Designing clean, uncluttered visual dashboards with intuitive controls.' },
      { step: '04', title: 'Performance Optimization', description: 'Caching queries and implementing incremental static regeneration for instant loads.' },
      { step: '05', title: 'Executive Handoff', description: 'Configuring role permissions, automated digests, and team onboarding.' }
    ],
    faq: [
      { question: 'Can the dashboard connect to Google Sheets as well as databases?', answer: 'Yes. We can pull data from Google Sheets, Airtable, PostgreSQL, MySQL, Stripe, and third-party APIs into one unified interface.' },
      { question: 'Is the data live or cached?', answer: 'We configure real-time updates for critical events while intelligently caching heavy statistical queries to ensure sub-second dashboard load speeds.' }
    ],
    cta_label: 'Get Custom Dashboards',
    is_enabled: true,
    display_order: 5
  },
  {
    id: 'srv-crm-workflow',
    title: 'CRM & Workflow Systems',
    slug: 'crm-workflow-systems',
    short_description:
      'Custom customer relationship management platforms, pipeline trackers, automated approval queues, and team task management systems.',
    description:
      'Streamline your client lifecycle from first touch to delivery. We build custom CRM and workflow platforms built around your sales funnel and fulfillment processes, with automated follow-ups, document generation, and status tracking.',
    icon: 'layers',
    features: [
      'Custom Deal Pipeline & Lead Status Boards (Kanban & Table Views)',
      'Automated Client Onboarding & Contract Generation Workflows',
      'Activity Timelines, Communication Logs, and Task Scheduling',
      'Automated Email & WhatsApp Notifications on Status Changes',
      'Client Facing Portals for Project Status & File Exchange',
      'Team Workload Balancing & Approval Flow Automation'
    ],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'React Hook Form', 'Zod', 'Resend'],
    benefits: [
      'Never lose track of a prospect or milestone with automated status triggers',
      'Standardize your team’s operating procedures across every client account',
      'Custom fields and workflow stages that reflect your exact sales and fulfillment playbook',
      'Fast, snappy interface without the lag of bloated enterprise CRM platforms'
    ],
    process: [
      { step: '01', title: 'Funnel & Workflow Mapping', description: 'Documenting every stage of your lead conversion and project fulfillment cycle.' },
      { step: '02', title: 'Data Architecture', description: 'Designing contacts, deals, tasks, activities, and audit history relational schemas.' },
      { step: '03', title: 'Workflow Engine & UI', description: 'Building the interactive Kanban boards, detail drawers, and filterable tables.' },
      { step: '04', title: 'Automated Triggers', description: 'Setting up automated emails, reminders, and webhook dispatches.' },
      { step: '05', title: 'Deployment & Training', description: 'Rolling out the system with seed data migration and team walkthrough.' }
    ],
    faq: [
      { question: 'Can we import our existing leads from spreadsheets or another CRM?', answer: 'Yes. We provide automated data migration scripts to import your contacts, companies, notes, and deal history cleanly.' },
      { question: 'Can clients have restricted access to see their own project status?', answer: 'Yes. We can include a branded client portal with restricted permissions where clients view progress, upload files, and approve deliverables.' }
    ],
    cta_label: 'Build Your Custom CRM',
    is_enabled: true,
    display_order: 6
  }
];

export const sampleSolutions: Solution[] = [
  {
    id: 'sol-lead-management',
    title: 'Lead Management & Sales Automation',
    slug: 'lead-management',
    description:
      'Capture leads from your website, ads, or WhatsApp, automatically qualify them based on your criteria, and route them directly to your team or calendar.',
    icon: 'funnel',
    features: ['Instant WhatsApp/Email auto-response', 'Lead qualification scoring', 'Automated calendar booking', 'CRM synchronization'],
    benefits: ['Sub-minute lead response times', 'Zero missed inquiries', 'Higher conversion rates'],
    use_cases: ['Agencies', 'B2B Services', 'Consultancies', 'Real Estate'],
    is_enabled: true,
    display_order: 1
  },
  {
    id: 'sol-support-automation',
    title: 'Customer Support Automation',
    slug: 'customer-support-automation',
    description:
      'Deploy intelligent support assistants trained on your documentation, FAQs, and product specs to resolve repetitive inquiries 24/7.',
    icon: 'chat',
    features: ['AI Knowledge Base Search', 'Ticket auto-triaging & tagging', 'WhatsApp & Web chat support', 'Human agent handover'],
    benefits: ['Instant 24/7 response time', '70%+ reduction in common ticket volume', 'Consistent answer accuracy'],
    use_cases: ['SaaS companies', 'E-commerce', 'Service Providers', 'EdTech'],
    is_enabled: true,
    display_order: 2
  },
  {
    id: 'sol-internal-automation',
    title: 'Internal Business Automation',
    slug: 'internal-business-automation',
    description:
      'Eliminate manual data entry, PDF invoice processing, CSV formatting, and cross-department synchronization tasks.',
    icon: 'cpu',
    features: ['Automated invoice & receipt parsing', 'Cross-app data sync', 'Scheduled reporting jobs', 'Approval notification triggers'],
    benefits: ['Save hundreds of team hours per month', 'Eliminate clerical transcription errors', 'Accelerate billing cycles'],
    use_cases: ['Finance & Accounting', 'Operations', 'Logistics', 'HR & Recruitment'],
    is_enabled: true,
    display_order: 3
  },
  {
    id: 'sol-custom-platforms',
    title: 'Custom Business Platforms & Portals',
    slug: 'custom-business-platforms',
    description:
      'Give your clients, partners, and internal staff dedicated, secure web portals to submit requests, view progress, and collaborate seamlessly.',
    icon: 'globe',
    features: ['Role-based access control', 'Document sharing & digital approvals', 'Project milestones tracker', 'Branded client interface'],
    benefits: ['Professional client experience', 'Centralized communication', 'Secure data isolation'],
    use_cases: ['Client Services', 'Logistics & Supply Chain', 'Healthcare & Clinics', 'Manufacturing'],
    is_enabled: true,
    display_order: 4
  },
  {
    id: 'sol-data-reporting',
    title: 'Data & Reporting Engines',
    slug: 'data-reporting',
    description:
      'Aggregate disparate data from payment processors, marketing channels, and internal databases into real-time interactive business intelligence.',
    icon: 'chart',
    features: ['Unified executive dashboards', 'Custom formula calculation engines', 'Automated PDF/Email summaries', 'Granular date slicing'],
    benefits: ['Clear insight into true profitability', 'Instant operational visibility', 'Eliminate manual spreadsheet prep'],
    use_cases: ['Multi-brand companies', 'E-commerce', 'Agencies', 'SaaS Leaders'],
    is_enabled: true,
    display_order: 5
  },
  {
    id: 'sol-booking-management',
    title: 'Booking & Scheduling Platforms',
    slug: 'booking-management',
    description:
      'Custom scheduling, resource allocation, and appointment management systems with automated calendar sync and payment checkout.',
    icon: 'calendar',
    features: ['Real-time availability engine', 'Multi-staff / multi-location support', 'Payment & deposit integration', 'Automated SMS/WhatsApp reminders'],
    benefits: ['Zero double-bookings', 'Drastic reduction in no-shows', 'Seamless booking UX'],
    use_cases: ['Clinics & Wellness', 'Rental Services', 'Consulting & Coaching', 'Event Spaces'],
    is_enabled: true,
    display_order: 6
  }
];

export const sampleProjects: Project[] = [
  {
    id: 'proj-omnipulse',
    name: 'OmniPulse Workflow & CRM Engine',
    slug: 'omnipulse-workflow-crm',
    short_description:
      'A streamlined, modern CRM and operational workflow platform engineered for service agencies to manage deal pipelines and automated client handoffs.',
    detailed_description:
      'OmniPulse is an internal concept demonstration showcasing a high-performance CRM architecture. It features interactive Kanban deal stages, automated webhook dispatches on deal closure, role-based access control, and dynamic activity timelines built with sub-second database response times.',
    problem:
      'Traditional enterprise CRM systems are frequently overburdened with bloated interfaces, slow load times, and escalating per-seat costs that hinder fast-moving teams.',
    solution:
      'We engineered a tailored, lightweight CRM engine using Next.js, PostgreSQL, and Supabase. The system delivers sub-100ms UI interactions, customizable deal stages, and automatic email notifications upon stage updates.',
    features: [
      'Interactive Kanban deal pipeline with drag-and-drop mechanics',
      'Real-time activity feed and internal team commenting',
      'Automated email notification triggers upon stage movement',
      'Comprehensive contact & company relationship graphs',
      'Instant search and multi-criteria status filtering'
    ],
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Zod', 'Server Actions'],
    industry: 'Internal Tool / Concept Build',
    project_type: 'Web Application & CRM',
    live_url: null,
    github_url: 'https://github.com/techknox/techknox',
    is_demo: true,
    results: 'Demonstrates modular schema design, sub-100ms CRUD responsiveness, and flexible workflow state machines.',
    status: 'completed',
    is_featured: true,
    display_order: 1
  },
  {
    id: 'proj-docuextract',
    name: 'DocuExtract AI Pipeline',
    slug: 'docuextract-ai-pipeline',
    short_description:
      'An intelligent document extraction service that automatically parses invoices, contracts, and unformatted PDFs into structured JSON records.',
    detailed_description:
      'DocuExtract AI is a production-pattern demonstration demonstrating automated document ingestion. Users or webhooks upload complex PDFs/images, and the system executes OCR, schema validation, and structured entity extraction with zero manual data entry.',
    problem:
      'Finance and operations teams often spend dozens of hours every week manually transcribing numbers, line items, and invoice dates from vendor PDFs into databases.',
    solution:
      'We implemented a multi-stage AI extraction pipeline leveraging Claude and OpenAI vision models with deterministic JSON schema validation, flagging low-confidence extractions for swift human review.',
    features: [
      'Automated PDF, PNG, and scanned document parsing',
      'Structured JSON output strictly typed against business schemas',
      'Confidence scoring with human-in-the-loop audit view',
      'Direct export to PostgreSQL, CSV, and accounting webhooks',
      'Secure temporary processing buffer with automatic document shredding'
    ],
    technologies: ['Python', 'FastAPI', 'Anthropic Claude API', 'LangChain', 'Next.js', 'PostgreSQL', 'Docker'],
    industry: 'AI & Automation / Concept Build',
    project_type: 'AI System & Pipeline',
    live_url: null,
    github_url: 'https://github.com/techknox/techknox',
    is_demo: true,
    results: 'Processes complex multi-page invoices in under 4 seconds with 98.5% automated field extraction accuracy.',
    status: 'completed',
    is_featured: true,
    display_order: 2
  },
  {
    id: 'proj-hypersync',
    name: 'HyperSync Multi-Platform API Gateway',
    slug: 'hypersync-api-gateway',
    short_description:
      'A resilient integration middleware connecting Stripe, WhatsApp Business, and HubSpot CRM with guaranteed event delivery.',
    detailed_description:
      'HyperSync is a middleware architecture blueprint built to showcase bidirectional synchronization between third-party SaaS platforms, featuring persistent queueing, idempotency keys, and automated failure recovery.',
    problem:
      'Direct webhook integrations between disparate platforms frequently drop payloads during traffic spikes or brief downstream API outages, leading to inconsistent state.',
    solution:
      'We designed an event-driven middleware with Redis queues, dead-letter storage, exponential retry protocols, and live webhook inspection dashboards.',
    features: [
      'Bidirectional synchronization between payments, CRM, and messaging',
      'Idempotency key enforcement to prevent duplicate actions',
      'Dead-letter queue with one-click retry management',
      'Real-time payload inspection and latency telemetry',
      'WhatsApp Business automated message dispatcher'
    ],
    technologies: ['Node.js', 'TypeScript', 'Redis', 'BullMQ', 'Stripe API', 'WhatsApp API', 'HubSpot API'],
    industry: 'Integration Architecture / Concept Build',
    project_type: 'API & Middleware Engine',
    live_url: null,
    github_url: 'https://github.com/techknox/techknox',
    is_demo: true,
    results: 'Guarantees zero dropped event payloads even during simulated 30-minute downstream API outages.',
    status: 'completed',
    is_featured: true,
    display_order: 3
  },
  {
    id: 'proj-opsflow',
    name: 'OpsFlow Business Intelligence Dashboard',
    slug: 'opsflow-bi-dashboard',
    short_description:
      'An executive analytics dashboard aggregating multi-channel revenue, project delivery velocity, and support ticket SLAs in real-time.',
    detailed_description:
      'OpsFlow is a reference analytics interface built for leadership teams. It consolidates database metrics, payment records, and support queues into clean, interactive charts with customizable date filters and instant PDF export.',
    problem:
      'Executives and operational managers waste critical time compiling manual spreadsheets from multiple dashboards to understand overall business performance.',
    solution:
      'We built a unified analytics interface using Next.js and Tailwind CSS with server-side aggregation caching, reducing dashboard query latency from 8s to under 300ms.',
    features: [
      'Real-time revenue, gross margin, and MRR tracking charts',
      'Team delivery velocity and open support ticket SLA meters',
      'Custom date range selection with comparative period overlays',
      'One-click PDF executive report generator',
      'Responsive design optimized for both desktop and iPad screens'
    ],
    technologies: ['Next.js 14', 'React', 'Tailwind CSS', 'Recharts', 'PostgreSQL', 'TypeScript'],
    industry: 'Business Intelligence / Concept Build',
    project_type: 'Data & Dashboard',
    live_url: null,
    github_url: 'https://github.com/techknox/techknox',
    is_demo: true,
    results: 'Demonstrates sub-300ms aggregate chart rendering across 100,000+ simulated transaction records.',
    status: 'completed',
    is_featured: false,
    display_order: 4
  }
];

export const sampleProcessSteps: ProcessStep[] = [
  { id: '1', title: 'Problem Discovery', description: 'We start by deeply understanding your operational workflow, bottlenecks, and specific objectives — not just a feature checklist.', display_order: 1 },
  { id: '2', title: 'System Architecture', description: 'We design the technical blueprints, data models, and integrations with clarity on milestones, scope, and deliverables.', display_order: 2 },
  { id: '3', title: 'Agile Engineering', description: 'We build in rapid, reviewable increments so you can test working software early and provide direct feedback.', display_order: 3 },
  { id: '4', title: 'Integration & Automation', description: 'We seamlessly connect your third-party tools, payment systems, CRMs, and APIs into a unified pipeline.', display_order: 4 },
  { id: '5', title: 'Rigorous QA & Testing', description: 'We conduct end-to-end testing, security audits, latency optimization, and responsive design verification.', display_order: 5 },
  { id: '6', title: 'Deployment & Support', description: 'We ship to production infrastructure with monitoring in place and remain available for ongoing evolution.', display_order: 6 }
];

export const sampleLegalPages: Record<string, LegalPage> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: `
# Privacy Policy for TechKnox

**Last Updated:** August 2026

TechKnox ("we", "us", or "our") values and respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our custom technology development and consulting services.

---

### 1. Information We Collect

We collect information that you voluntarily provide directly to us when you:
- Fill out a contact inquiry, request-a-solution form, or project brief.
- Communicate with us via email, phone, or WhatsApp.
- Request a consultation, quotation, or proposal for technology services.

**Types of Data Collected:**
- **Contact Data:** Full name, business email address, phone number, WhatsApp number, and country.
- **Company Information:** Company or organization name, website URL, and industry.
- **Project Specifications:** Project descriptions, system requirements, existing technology stacks, required integrations, budget ranges, and desired timelines.
- **Technical Usage Data:** Standard non-personally identifiable log information (browser type, operating system, referring URLs, access timestamps, and page views) collected automatically to optimize website performance.

---

### 2. How We Use Your Information

We use the collected information strictly for legitimate business purposes, including:
- Reviewing your project requirements and delivering accurate technical proposals.
- Communicating directly with you regarding inquiries, project consultations, and updates.
- Providing, developing, and maintaining custom software, web applications, and automation systems.
- Monitoring and improving the security, performance, and usability of our website.
- Complying with applicable legal obligations and preventing spam or unauthorized abuse.

We do **not** sell, rent, or monetize your personal or company information to any third parties for advertising or marketing.

---

### 3. Data Confidentiality & Client Intellectual Property

All business specifications, architecture designs, proprietary business logic, and credentials shared with TechKnox during project consultations and client engagements are treated as strictly confidential. We are committed to executing non-disclosure agreements (NDAs) upon client request prior to receiving sensitive business data.

---

### 4. Third-Party Services & Integrations

Our website and services may interact with trusted third-party service providers (such as hosting infrastructure, database hosting, and transactional email providers) solely for the purpose of operating our business systems. These providers only access information necessary to execute their specific technical functions and are obligated to uphold data confidentiality.

---

### 5. Data Security

We implement reasonable and appropriate technical and organizational measures (such as TLS/SSL encryption, secure database access control, and environment variable isolation) to protect your personal information against unauthorized access, alteration, or disclosure.

---

### 6. Your Data Rights

Depending on your jurisdiction, you have the right to:
- Request access to the personal data we hold about you.
- Request correction of any inaccurate or incomplete personal information.
- Request the deletion of your personal data from our active records.

To exercise any of these rights, please reach out to us directly through our official contact channels.

---

### 7. Updates to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our operational or legal practices. Any changes will be posted directly on this page with an updated "Last Updated" date.

---

### 8. Contact Us

If you have questions, feedback, or concerns regarding this Privacy Policy, please contact us:
- **Email:** techknoxin@gmail.com
- **Website:** [techknox.dev](https://techknox.dev)
- **Contact Page:** [/contact](file:///contact)
    `
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    content: `
# Terms and Conditions for TechKnox

**Last Updated:** August 2026

Please read these Terms and Conditions ("Terms") carefully before using the TechKnox website or engaging TechKnox ("we", "us", or "our") for custom software, web development, AI automation, or technology consulting services.

By accessing our website or submitting project requests, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.

---

### 1. Scope of Technology Services

TechKnox provides custom technology engineering, software development, web and mobile application development, API integrations, workflow automation, and technical consulting. All client engagements are governed by specific project proposals, statements of work (SOW), or service agreements mutually agreed upon between TechKnox and the client.

---

### 2. Website Use & Intellectual Property

- All content, brand assets, logos, design layouts, graphics, and documentation on this website are the property of TechKnox and are protected by applicable copyright and intellectual property laws.
- You may not reproduce, copy, distribute, or reverse-engineer any portion of the TechKnox website or concept demonstrations without prior written authorization.
- Concept projects and demo prototypes displayed in our portfolio are showcased for demonstration and capability presentation purposes.

---

### 3. Client Engagements & Source Code Ownership

- Custom code, database schemas, and digital deliverables created specifically for a client under a paid project agreement become the intellectual property of the client upon receipt of full milestone payment, subject to the terms of the individual client contract.
- Any open-source libraries or third-party frameworks utilized in a project remain subject to their respective open-source licenses (e.g., MIT, Apache 2.0).

---

### 4. Third-Party Integrations & External Platforms

TechKnox builds custom integrations connecting client systems to third-party platforms (such as payment gateways, CRMs, WhatsApp Business, AI providers, and ERPs). 
- We do not claim official corporate partnership with third-party software providers unless explicitly verified.
- TechKnox is not responsible for downtimes, API rate limit modifications, pricing changes, or policy alterations instituted by independent third-party providers.

---

### 5. Client Obligations & Content Responsibility

Clients are responsible for:
- Providing accurate project requirements, brand assets, and access credentials necessary for project execution.
- Ensuring they possess appropriate rights and licenses for any text, media, APIs, or data provided to TechKnox for incorporation into projects.

---

### 6. Limitation of Liability

To the maximum extent permitted by applicable law, TechKnox shall not be liable for any indirect, incidental, consequential, or punitive damages resulting from the use or inability to use our website, concept builds, or third-party service dependencies.

---

### 7. Modifications to Terms

TechKnox reserves the right to modify or replace these Terms at any time. Changes become effective immediately upon posting to this page. Continued use of our website or services after any modifications constitutes acceptance of the revised Terms.

---

### 8. Governing Law & Dispute Resolution

Any disputes arising from the use of our website or services shall be handled through good-faith direct negotiation before pursuing formal legal proceedings in the appropriate competent jurisdiction.

---

### 9. Inquiries and Contact

If you have questions regarding these Terms and Conditions, please contact us at:
- **Email:** techknoxin@gmail.com
- **Website:** [techknox.dev](https://techknox.dev)
- **Contact Form:** [/contact](file:///contact)
    `
  }
};
