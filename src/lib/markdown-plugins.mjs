// Markdown plugin for Astro's Sätteri processor.
//
// Gaps: text in [brackets] is a gap Malin still has to fill (rules in gaps.mjs).
// It is removed from the rendered page; a paragraph, list item or whole section
// that only held gaps disappears with it.
//
// Figures: a paragraph that holds only images becomes a <figure> (the image
// title is the caption). Two or more images side by side become an image pair.
//   ![Alt text](./image.jpg "Caption")
//   ![Before](./a.jpg "Before") ![After](./b.jpg "After")

import { gapRanges, tidy } from './gaps.mjs';

const OBJECT = '￼'; // stands in for non-text inline nodes (images, code, breaks)

const isWhitespaceText = (n) => n.type === 'text' && !n.value.trim();

/** Flattened text of an inline tree, one character per leaf for non-text nodes. */
function flatten(children) {
  return children
    .map((c) => (c.type === 'text' ? c.value : Array.isArray(c.children) ? flatten(c.children) : OBJECT))
    .join('');
}

function removeRanges(children, del, state = { i: 0 }) {
  const out = [];
  for (const child of children) {
    if (child.type === 'text') {
      let value = '';
      for (const ch of child.value) if (!del[state.i++]) value += ch;
      if (value) out.push({ type: 'text', value });
    } else if (Array.isArray(child.children)) {
      const inner = removeRanges(child.children, del, state);
      if (inner.length) out.push({ ...child, children: inner });
    } else if (!del[state.i++]) {
      out.push(child);
    }
  }
  return out;
}

function tidyInline(children) {
  const merged = [];
  for (const c of children) {
    const prev = merged[merged.length - 1];
    if (c.type === 'text' && prev?.type === 'text') merged[merged.length - 1] = { type: 'text', value: prev.value + c.value };
    else merged.push(c.type === 'text' ? { ...c, value: tidy(c.value) } : c);
  }
  const n = merged.length;
  if (merged[0]?.type === 'text') merged[0] = { type: 'text', value: tidy(merged[0].value).trimStart() };
  if (merged[n - 1]?.type === 'text') merged[n - 1] = { type: 'text', value: tidy(merged[n - 1].value).trimEnd() };
  return merged.filter((c) => !(c.type === 'text' && c.value === ''));
}

function hideInlineGaps(children) {
  const text = flatten(children);
  const ranges = gapRanges(text);
  if (!ranges.length) return children;
  const del = new Uint8Array(text.length);
  for (const [s, e] of ranges) del.fill(1, s, e);
  return tidyInline(removeRanges(children, del));
}

const isEmptyInline = (children) =>
  children.every((c) => isWhitespaceText(c) || (Array.isArray(c.children) && isEmptyInline(c.children)));

/** Returns the block with gaps removed, or null if nothing is left. */
function cleanBlock(node) {
  switch (node.type) {
    case 'paragraph':
    case 'heading': {
      const children = hideInlineGaps(node.children);
      return isEmptyInline(children) ? null : { ...node, children };
    }
    case 'list':
    case 'listItem':
    case 'blockquote': {
      const children = node.children.map(cleanBlock).filter(Boolean);
      return children.length ? { ...node, children } : null;
    }
    default:
      return node;
  }
}

const isTopLevel = (node, ctx) => ctx.parent(node)?.type === 'root';
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function cleanTopLevel(node, ctx) {
  if (!isTopLevel(node, ctx)) return;
  const cleaned = cleanBlock(node);
  if (!cleaned) ctx.removeNode(node);
  else if (!same(cleaned, node)) ctx.replaceNode(node, cleaned);
}

function toFigure(img) {
  const children = [{ type: 'image', url: img.url, alt: img.alt ?? '' }];
  if (img.title) {
    children.push({ type: 'paragraph', data: { hName: 'figcaption' }, children: [{ type: 'text', value: img.title }] });
  }
  return { type: 'paragraph', data: { hName: 'figure', hProperties: { className: ['figure'] } }, children };
}

export const hideBrackets = {
  name: 'hide-brackets-and-figures',
  heading(node, ctx) {
    if (!isTopLevel(node, ctx)) return;
    const siblings = ctx.parent(node).children;
    // A heading whose whole section was gaps goes too.
    let sectionHasContent = false;
    for (let i = ctx.indexOf(node) + 1; i < siblings.length; i++) {
      const s = siblings[i];
      if (s.type === 'heading' && s.depth <= node.depth) break;
      if (cleanBlock(s)) {
        sectionHasContent = true;
        break;
      }
    }
    if (!sectionHasContent || !cleanBlock(node)) ctx.removeNode(node);
    else cleanTopLevel(node, ctx);
  },
  paragraph(node, ctx) {
    if (!isTopLevel(node, ctx)) return;
    const content = node.children.filter((c) => !isWhitespaceText(c));
    if (content.length && content.every((c) => c.type === 'image')) {
      const figure =
        content.length === 1
          ? toFigure(content[0])
          : {
              type: 'paragraph',
              data: { hName: 'div', hProperties: { className: ['image-pair'] } },
              children: content.map(toFigure),
            };
      ctx.replaceNode(node, figure);
      return;
    }
    cleanTopLevel(node, ctx);
  },
  list: cleanTopLevel,
  blockquote: cleanTopLevel,
};
