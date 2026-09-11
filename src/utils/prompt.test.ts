import { describe, expect, it } from 'vitest';
import { isPromptLengthValid, MAX_PROMPT_LENGTH } from './prompt';

describe('isPromptLengthValid', () => {
  it('500자 프롬프트를 허용한다', () => {
    expect(isPromptLengthValid('가'.repeat(MAX_PROMPT_LENGTH))).toBe(true);
  });

  it('501자 프롬프트를 거부한다', () => {
    expect(isPromptLengthValid('가'.repeat(MAX_PROMPT_LENGTH + 1))).toBe(false);
  });
});
