// Front-matter version of the Markdown gap rule (see gaps.mjs).
import { hideGaps as hide } from './gaps.mjs';

export function hideGaps(value: string | undefined | null): string {
  return hide(value ?? '');
}

/** Keeps only the items that still have text once gaps are hidden. */
export function hideGapItems(values: string[] = []): string[] {
  return values.map(hideGaps).filter(Boolean);
}
