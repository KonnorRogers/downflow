import type { TranslationStrings } from "../types";
/**
 * Get translations for a given language code.
 * Uses BCP-47 parsing with fallback chain:
 * 1. language-script-region (e.g., zh-Hans-CN)
 * 2. language-region (e.g., en-US)
 * 3. language (e.g., en)
 * 4. English fallback
 */
export declare function getTranslations(langCode?: string): TranslationStrings;
/**
 * Interpolate placeholders in a translation string.
 * Placeholders are in the format [PLACEHOLDER_NAME].
 */
export declare function interpolate(str: string | undefined, replacements?: Record<string, string | number>, locale?: string): string;
