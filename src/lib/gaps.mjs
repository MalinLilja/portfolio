// Text in [brackets] is a gap Malin still has to fill. Gaps never reach the
// page, and removing one must not leave a broken sentence behind:
//
//   "Result: launched. [Add usage.]"              → "Result: launched."
//   "…cloud solution, used by [customers]."       → "…cloud solution."
//   "I interviewed [N] crewing managers. Next."   → "Next."

const SENTENCE_END = /[.!?…]["”’)]?(?=\s|$)/g;
const CLAUSE_BREAK = /(,|;|:|\s[–—-])\s/g;

function lastMatchEnd(re, text) {
  let end = -1;
  for (const m of text.matchAll(re)) end = m.index + m[0].length;
  return end;
}

/** Character ranges [start, end) to delete from `text`. */
export function gapRanges(text) {
  const ranges = [];
  for (const m of text.matchAll(/\[[^\]]*\]/g)) {
    const a = m.index;
    const b = a + m[0].length;

    const before = text.slice(0, a).replace(/\[[^\]]*\]/g, (s) => ' '.repeat(s.length));
    const sentStart = Math.max(0, lastMatchEnd(SENTENCE_END, before));
    const after = text.slice(b).search(/[.!?…]["”’)]?(?=\s|$)/);
    const sentEnd = after === -1 ? text.length : b + after; // index of the sentence's final punctuation
    const lead = text.slice(sentStart, a);
    const tail = text.slice(b, sentEnd);
    const wholeSentence = [sentStart, Math.min(text.length, sentEnd + 1)];

    if (!lead.trim()) {
      // The gap opens its sentence: drop just the gap, or the sentence if it carries on.
      ranges.push(tail.trim() ? wholeSentence : [a, b]);
      continue;
    }
    // The gap sits mid-sentence: cut back to the last clause break, or drop the sentence.
    const clause = lastMatchEnd(CLAUSE_BREAK, lead);
    if (clause === -1) ranges.push(wholeSentence);
    else {
      const cutFrom = sentStart + lead.slice(0, clause).search(/(,|;|:|\s[–—-])\s$/);
      ranges.push([cutFrom, tail.trim() ? sentEnd : b]);
    }
  }
  return ranges;
}

export function tidy(text) {
  return text
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/ +([.,;:!?])/g, '$1')
    .replace(/([.!?])\./g, '$1');
}

/** Plain-string version, used for front matter. */
export function hideGaps(text) {
  if (!text) return '';
  const del = new Uint8Array(text.length);
  for (const [s, e] of gapRanges(text)) del.fill(1, s, e);
  let out = '';
  for (let i = 0; i < text.length; i++) if (!del[i]) out += text[i];
  return tidy(out).trim();
}
