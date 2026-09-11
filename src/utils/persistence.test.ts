import { describe, expect, it, beforeEach } from 'vitest';
import type { GeneratedComponent } from '../types';
import {
  loadComponents,
  loadPromptHistory,
  loadProvider,
  saveComponents,
  savePromptHistory,
  STORAGE_KEYS,
} from './persistence';

describe('persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('restores only supported providers', () => {
    localStorage.setItem(STORAGE_KEYS.provider, 'anthropic');
    expect(loadProvider()).toBe('anthropic');

    localStorage.setItem(STORAGE_KEYS.provider, 'unsupported');
    expect(loadProvider()).toBe('google');
  });

  it('stores generated components and restores their creation dates', () => {
    const components: GeneratedComponent[] = [{
      id: 'component-1',
      prompt: '프로필 카드',
      code: 'render(<div />);',
      createdAt: new Date('2026-09-11T10:00:00.000Z'),
    }];

    saveComponents(components);

    expect(loadComponents()).toEqual(components);
    expect(loadComponents()[0].createdAt).toBeInstanceOf(Date);
  });

  it('falls back safely when persisted values are malformed', () => {
    localStorage.setItem(STORAGE_KEYS.components, '{not json');
    localStorage.setItem(STORAGE_KEYS.promptHistory, JSON.stringify(['valid', 123]));

    expect(loadComponents()).toEqual([]);
    expect(loadPromptHistory()).toEqual([]);
  });

  it('persists prompt history', () => {
    savePromptHistory(['검색 필터', '프로필 카드']);

    expect(loadPromptHistory()).toEqual(['검색 필터', '프로필 카드']);
  });
});
