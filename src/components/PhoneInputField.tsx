'use client';

/**
 * PhoneInputField
 * ---------------
 * International phone input with searchable country selector.
 * Uses react-phone-number-input for country data (country codes, calling codes).
 * UI is fully custom-styled to match Teknox dark/glass aesthetic.
 *
 * - Default country: India (IN, +91)
 * - Searchable by country name, ISO code, or calling code
 * - Number input accepts digits + spaces only — letters are stripped on keypress
 * - Produces E.164 combined value (+<callingCode><digits>) via hidden form input
 * - Exposes onValueChange so the parent can validate before submission
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert ISO 3166-1 alpha-2 code to Unicode flag emoji */
function toFlag(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)));
}

/**
 * Some codes returned by getCountries() (e.g. AC, TA) are not in the
 * calling-code dataset and will throw. Return null for those.
 */
function safeCallingCode(code: Country): string | null {
  try {
    const c = getCountryCallingCode(code);
    return c ?? null;
  } catch {
    return null;
  }
}

interface CountryOption {
  code: Country;
  name: string;
  calling: string;
  flag: string;
}

/** Full sorted country list, built once at module load */
const ALL_COUNTRIES: CountryOption[] = (getCountries() as Country[])
  .map((code) => {
    const calling = safeCallingCode(code);
    if (!calling) return null;
    return {
      code,
      name: (en as Record<string, string>)[code] ?? String(code),
      calling,
      flag: toFlag(code),
    };
  })
  .filter((c): c is CountryOption => c !== null)
  .sort((a, b) => a.name.localeCompare(b.name));

const INDIA = ALL_COUNTRIES.find((c) => c.code === 'IN') ?? ALL_COUNTRIES[0];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PhoneInputFieldProps {
  /** The `name` attribute for the hidden input submitted in FormData */
  name: string;
  /** Visible label id used for aria-labelledby on the number input */
  id: string;
  disabled?: boolean;
  /** ISO 3166-1 alpha-2 code, defaults to 'IN' */
  defaultCountry?: Country;
  /** Placeholder text for the number portion */
  placeholder?: string;
  /** Show red border + sets aria-invalid */
  error?: string | null;
  /** id of the external <p> error element for aria-describedby */
  ariaDescribedById?: string;
  /** Called whenever the combined E.164 value changes */
  onValueChange?: (e164: string) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PhoneInputField({
  name,
  id,
  disabled = false,
  defaultCountry = 'IN',
  placeholder = '98765 43210',
  error,
  ariaDescribedById,
  onValueChange,
}: PhoneInputFieldProps) {
  const [country, setCountry] = useState<CountryOption>(
    () => ALL_COUNTRIES.find((c) => c.code === defaultCountry) ?? INDIA
  );
  const [digits, setDigits] = useState('');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Combined E.164 value — empty string if no digits entered
  const combined = digits.trim() ? `+${country.calling}${digits.replace(/\s/g, '')}` : '';

  // Notify parent whenever value changes
  useEffect(() => {
    onValueChange?.(combined);
  }, [combined, onValueChange]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Auto-focus search when dropdown opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Filtered country list
  const filtered = search.trim()
    ? ALL_COUNTRIES.filter((c) => {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase() === q ||
          c.calling.startsWith(q.replace('+', ''))
        );
      })
    : ALL_COUNTRIES;

  // Only allow digits + spaces in the number portion
  const handleDigitInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/[^\d\s]/g, '');
    e.target.value = cleaned;
    setDigits(cleaned);
  }, []);

  const handleCountrySelect = useCallback((c: CountryOption) => {
    setCountry(c);
    setOpen(false);
    setSearch('');
  }, []);

  const borderClass = error
    ? 'border-red-500/70 focus-within:border-red-500 focus-within:ring-red-500/50'
    : 'border-line-bright focus-within:border-signal focus-within:ring-signal';

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* ── Main input row ─────────────────────────────────────────────── */}
      <div
        className={`flex w-full rounded-xl border ${borderClass} bg-panel overflow-visible focus-within:ring-1 transition`}
      >
        {/* Country selector button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-3 border-r border-line-bright bg-panel-light hover:bg-panel text-sm font-mono text-star shrink-0 transition rounded-l-xl min-w-[85px] sm:min-w-[100px] justify-center"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Country code: ${country.name} +${country.calling}`}
        >
          <span className="text-base leading-none select-none">{country.flag}</span>
          <span className="text-steeldim text-xs">+{country.calling}</span>
          <svg
            className={`w-3 h-3 text-steeldim/70 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Digit-only number input */}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          disabled={disabled}
          placeholder={placeholder}
          value={digits}
          onChange={handleDigitInput}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={ariaDescribedById}
          className="flex-1 min-w-0 px-3 sm:px-4 py-3 text-sm text-star bg-transparent outline-none placeholder:text-steeldim/60"
        />
      </div>

      {/* Hidden input carries the E.164 combined value for FormData */}
      <input type="hidden" name={name} value={combined} />

      {/* ── Country dropdown ───────────────────────────────────────────── */}
      {open && (
        <div
          className="absolute z-[100] left-0 top-[calc(100%+4px)] w-72 max-w-[calc(100vw-32px)] rounded-xl border border-line-bright bg-panel shadow-2xl shadow-black/60 overflow-hidden"
          role="dialog"
          aria-label="Select country"
        >
          {/* Search input */}
          <div className="p-2 border-b border-line bg-panel-light">
            <div className="relative">
              <svg
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-steeldim/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country, code, or +..."
                className="w-full rounded-lg border border-line bg-panel px-3 py-2 pl-8 text-xs text-star placeholder:text-steeldim/50 outline-none focus:border-signal transition"
              />
            </div>
          </div>

          {/* Country list */}
          <ul
            className="max-h-56 overflow-y-auto scrollbar-thin"
            role="listbox"
            aria-label="Countries"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-4 text-xs text-steeldim text-center font-mono">
                No results for &ldquo;{search}&rdquo;
              </li>
            ) : (
              filtered.map((c) => (
                <li key={c.code} role="option" aria-selected={c.code === country.code}>
                  <button
                    type="button"
                    onClick={() => handleCountrySelect(c)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition ${
                      c.code === country.code
                        ? 'bg-signal/15 text-signal'
                        : 'text-star hover:bg-signal/8'
                    }`}
                  >
                    <span className="text-base leading-none shrink-0 select-none">{c.flag}</span>
                    <span className="flex-1 truncate text-xs">{c.name}</span>
                    <span className="text-steeldim font-mono text-xs shrink-0 tabular-nums">
                      +{c.calling}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
