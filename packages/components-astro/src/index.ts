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
export { default as NavLink }    from './atoms/buttons/NavLink.astro';

// ── Atoms — Forms ──────────────────────────────────────────────
export { default as Checkbox }    from './atoms/forms/Checkbox.astro';
export { default as Radio }       from './atoms/forms/Radio.astro';
export { default as Toggle }      from './atoms/forms/Toggle.astro';
export { default as SearchField } from './atoms/forms/SearchField.astro';
export { default as TextField }   from './atoms/forms/TextField.astro';
export { default as TextArea }    from './atoms/forms/TextArea.astro';

// ── Atoms — Typography ─────────────────────────────────────────
export { default as Heading }   from './atoms/typography/Heading.astro';
export { default as Text }      from './atoms/typography/Text.astro';


// ── Atoms — Indicators ─────────────────────────────────────────
export { default as Badge }      from './atoms/indicators/Badge.astro';
export { default as Chip }       from './atoms/indicators/Chip.astro';
export { default as Tag }        from './atoms/indicators/Tag.astro';
export { default as Spinner }    from './atoms/indicators/Spinner.astro';
export { default as EmptyState } from './atoms/indicators/EmptyState.astro';

// ── Atoms — Media ──────────────────────────────────────────────
export { default as Avatar } from './atoms/media/Avatar.astro';

// ── Atoms — Layout ─────────────────────────────────────────────
export { default as Divider } from './atoms/layout/Divider.astro';

// ── Atoms — Lists ──────────────────────────────────────────────
export { default as BulletItem } from './atoms/lists/BulletItem.astro';
export { default as NumberItem } from './atoms/lists/NumberItem.astro';

// ── Atoms — Navigation ─────────────────────────────────────────
export { default as Pagination }     from './atoms/navigation/Pagination.astro';
export { default as SegmentControl } from './atoms/navigation/SegmentControl.astro';

// ── Atoms — Feedback ───────────────────────────────────────────
export { default as Tooltip } from './atoms/feedback/Tooltip.astro';

// ── Molecules ──────────────────────────────────────────────────
export { default as AvatarGroup } from './molecules/AvatarGroup.astro';

// ── Molecules — Containers ─────────────────────────────────
export { default as Accordion } from './molecules/Accordion.astro';

// ── Molecules — Marketing ──────────────────────────────────
export { default as Marquee } from './molecules/Marquee.astro';

// ── Molecules — Card System ────────────────────────────────
export { default as Card }       from './molecules/Card.astro';
export { default as CardHeader } from './molecules/CardHeader.astro';
export { default as CardBody }   from './molecules/CardBody.astro';
export { default as CardFooter } from './molecules/CardFooter.astro';

// ── Molecules — Branding ───────────────────────────────────
export { default as LogoBadge } from './molecules/branding/LogoBadge.astro';

// ── Molecules — Navigation ─────────────────────────────────
export { default as DropdownMenu }        from './molecules/navigation/DropdownMenu.astro';
export { default as NavLanguageSwitcher } from './molecules/navigation/NavLanguageSwitcher.astro';

// ── Molecules — Dialog System ──────────────────────────────
export { default as Dialog }          from './molecules/Dialog.astro';
export { default as DialogHeadline }  from './molecules/DialogHeadline.astro';
export { default as DialogContent }   from './molecules/DialogContent.astro';
export { default as DialogActions }   from './molecules/DialogActions.astro';

// ── Atoms — Integrations ───────────────────────────────────
export { default as WhatsAppButton } from './atoms/integrations/WhatsAppButton.astro';
