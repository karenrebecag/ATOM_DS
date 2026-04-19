/**
 * @atomchat/components-astro — Component exports
 *
 * Export all Astro components for easy imports:
 * import { Badge, Container, Stack } from '@atomchat/components-astro'
 */

// ── Layout Primitives ──────────────────────────────────────────
export { default as Container } from './layout/Container.astro';
export { default as Stack }     from './layout/Stack.astro';
export { default as Inline }    from './layout/Inline.astro';
export { default as Grid }      from './layout/Grid.astro';
export { default as Section }   from './layout/Section.astro';
export { default as Center }    from './layout/Center.astro';

// ── Atoms — Buttons ────────────────────────────────────────────
export { default as Button }     from './atoms/buttons/Button.astro';
export { default as IconButton } from './atoms/buttons/IconButton.astro';
export { default as LinkButton } from './atoms/buttons/LinkButton.astro';

// ── Atoms — Forms ──────────────────────────────────────────────
export { default as Checkbox } from './atoms/forms/Checkbox.astro';
export { default as Radio }    from './atoms/forms/Radio.astro';
export { default as Toggle }   from './atoms/forms/Toggle.astro';

// ── Atoms — Typography ─────────────────────────────────────────
export { default as Heading }   from './atoms/typography/Heading.astro';
export { default as Text }      from './atoms/typography/Text.astro';
export { default as Caption }   from './atoms/typography/Caption.astro';
export { default as LabelText } from './atoms/typography/LabelText.astro';
export { default as LegalMeta } from './atoms/typography/LegalMeta.astro';

// ── Atoms — Indicators ─────────────────────────────────────────
export { default as Badge }   from './atoms/indicators/Badge.astro';
export { default as Chip }    from './atoms/indicators/Chip.astro';
export { default as Tag }     from './atoms/indicators/Tag.astro';
export { default as Spinner } from './atoms/indicators/Spinner.astro';

// ── Atoms — Media ──────────────────────────────────────────────
export { default as Avatar } from './atoms/media/Avatar.astro';

// ── Atoms — Layout ─────────────────────────────────────────────
export { default as Divider } from './atoms/layout/Divider.astro';

// ── Atoms — Lists ──────────────────────────────────────────────
export { default as BulletItem } from './atoms/lists/BulletItem.astro';
export { default as NumberItem } from './atoms/lists/NumberItem.astro';

// ── Molecules ──────────────────────────────────────────────────
export { default as AvatarGroup } from './molecules/AvatarGroup.astro';
