import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App theme selection', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('rcg-theme', 'light');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({ envKeys: {} }) }));
  });

  it('selects the retro theme and persists the choice', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '레트로 테마로 전환' }));

    expect(document.documentElement.dataset.theme).toBe('retro');
    expect(localStorage.getItem('rcg-theme')).toBe('retro');
  });
});
