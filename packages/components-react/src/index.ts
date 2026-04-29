/**
 * @atomchat.io/components-react — Component exports
 *
 * @version 2.1.0
 */

// ── Types ──────────────────────────────────────────────────
export type {
  SizeVariant,
  ButtonVariant,
} from './types';

// ── Atoms — Buttons ────────────────────────────────────────
export { Button } from './atoms/buttons/Button';
export type { ButtonProps } from './atoms/buttons/Button';

export { IconButton } from './atoms/buttons/IconButton';
export type { IconButtonProps } from './atoms/buttons/IconButton';

export { LinkButton } from './atoms/buttons/LinkButton';
export type { LinkButtonProps } from './atoms/buttons/LinkButton';

export { NavLink } from './atoms/buttons/NavLink';
export type { NavLinkProps } from './atoms/buttons/NavLink';

// ── Atoms — Navigation ─────────────────────────────────────
export { Pagination } from './atoms/navigation/Pagination';
export type { PaginationProps } from './atoms/navigation/Pagination';

export { SegmentControl } from './atoms/navigation/SegmentControl';
export type { SegmentControlProps, SegmentControlItem } from './atoms/navigation/SegmentControl';

// ── Atoms — Media ──────────────────────────────────────────
export { Avatar } from './atoms/media/Avatar';
export type { AvatarProps } from './atoms/media/Avatar';

// ── Atoms — Indicators ─────────────────────────────────────
export { Badge, Chip, Tag, Spinner, EmptyState, Skeleton } from './atoms/indicators';
export type { BadgeProps } from './atoms/indicators';
export type { ChipProps } from './atoms/indicators';
export type { TagProps, TagIntent, TagVariant, TagSize } from './atoms/indicators';
export type { SpinnerProps } from './atoms/indicators';
export type { EmptyStateProps } from './atoms/indicators';
export type { SkeletonProps, SkeletonVariant } from './atoms/indicators';

// ── Atoms — Typography ─────────────────────────────────────
export { Heading, Text } from './atoms/typography';
export type { HeadingProps } from './atoms/typography';
export type { TextProps } from './atoms/typography';

// ── Atoms — Layout ─────────────────────────────────────────
export { Divider } from './atoms/layout';
export type { DividerProps } from './atoms/layout';

// ── Atoms — Lists ──────────────────────────────────────────
export { BulletItem, NumberItem } from './atoms/lists';
export type { BulletItemProps } from './atoms/lists';
export type { NumberItemProps } from './atoms/lists';

// ── Atoms — Forms ──────────────────────────────────────────
export { Checkbox, Radio, Toggle, TextField, TextArea, SearchField } from './atoms/forms';
export type { CheckboxProps } from './atoms/forms';
export type { RadioProps } from './atoms/forms';
export type { ToggleProps } from './atoms/forms';
export type { TextFieldProps } from './atoms/forms';
export type { TextAreaProps } from './atoms/forms';
export type { SearchFieldProps } from './atoms/forms';

// ── Molecules ──────────────────────────────────────────────
export { Accordion } from './molecules/Accordion';
export type { AccordionProps, AccordionItem } from './molecules/Accordion';

export { AvatarGroup } from './molecules/AvatarGroup';
export type { AvatarGroupProps, AvatarGroupItem } from './molecules/AvatarGroup';

export { Dialog } from './molecules/Dialog';
export type { DialogProps } from './molecules/Dialog';

export { DialogHeadline } from './molecules/DialogHeadline';
export type { DialogHeadlineProps } from './molecules/DialogHeadline';

export { DialogContent } from './molecules/DialogContent';
export type { DialogContentProps } from './molecules/DialogContent';

export { DialogActions } from './molecules/DialogActions';
export type { DialogActionsProps } from './molecules/DialogActions';

export { Card } from './molecules/Card';
export type { CardProps } from './molecules/Card';

export { CardHeader } from './molecules/CardHeader';
export type { CardHeaderProps } from './molecules/CardHeader';

export { CardBody } from './molecules/CardBody';
export type { CardBodyProps } from './molecules/CardBody';

export { CardFooter } from './molecules/CardFooter';
export type { CardFooterProps } from './molecules/CardFooter';

export { LogoBadge } from './molecules/LogoBadge';
export type { LogoBadgeProps } from './molecules/LogoBadge';

export { Marquee } from './molecules/Marquee';
export type { MarqueeProps } from './molecules/Marquee';

export { Tooltip } from './molecules/Tooltip';
export type { TooltipProps } from './molecules/Tooltip';

// ── Integrations ───────────────────────────────────────────
export { WhatsAppButton } from './atoms/integrations/WhatsAppButton';
export type { WhatsAppButtonProps } from './atoms/integrations/WhatsAppButton';

// ── Utilities ──────────────────────────────────────────────
export { cn } from './utils/cn';
