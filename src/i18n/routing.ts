export const routing = {
  locales: ['en', 'ja'] as const,
  defaultLocale: 'en' as const
};

export type Locale = (typeof routing.locales)[number];

export function hasLocale(
  locales: readonly string[],
  value: string | null | undefined
): value is Locale {
  return !!value && locales.includes(value);
}
