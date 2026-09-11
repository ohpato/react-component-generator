import type { GeneratedComponent, Provider } from '../types';

export const STORAGE_KEYS = {
  apiKey: 'rcg-api-key',
  provider: 'rcg-provider',
  promptHistory: 'rcg-prompt-history',
  components: 'rcg-components',
} as const;

const isProvider = (value: string | null): value is Provider =>
  value === 'anthropic' || value === 'google';

export function loadProvider(): Provider {
  const provider = localStorage.getItem(STORAGE_KEYS.provider);
  return isProvider(provider) ? provider : 'google';
}

export function loadPromptHistory(): string[] {
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.promptHistory) ?? '[]');
    return Array.isArray(history) && history.every((prompt) => typeof prompt === 'string')
      ? history
      : [];
  } catch {
    return [];
  }
}

export function savePromptHistory(history: string[]) {
  localStorage.setItem(STORAGE_KEYS.promptHistory, JSON.stringify(history));
}

export function loadComponents(): GeneratedComponent[] {
  try {
    const components = JSON.parse(localStorage.getItem(STORAGE_KEYS.components) ?? '[]');
    if (!Array.isArray(components)) return [];

    return components.flatMap((component) => {
      if (
        typeof component?.id !== 'string' ||
        typeof component.prompt !== 'string' ||
        typeof component.code !== 'string' ||
        typeof component.createdAt !== 'string'
      ) {
        return [];
      }

      const createdAt = new Date(component.createdAt);
      return Number.isNaN(createdAt.getTime()) ? [] : [{ ...component, createdAt }];
    });
  } catch {
    return [];
  }
}

export function saveComponents(components: GeneratedComponent[]) {
  localStorage.setItem(STORAGE_KEYS.components, JSON.stringify(components));
}
