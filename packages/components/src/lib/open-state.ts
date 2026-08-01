/**
 * Shared open-state props for overlays.
 * Prefer `open` / `onOpenChange`. Legacy `isVisible` / `onClose` still work.
 */
export type OpenStateProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** @deprecated Use `open` */
  isVisible?: boolean;
  /** @deprecated Use `onOpenChange(false)` */
  onClose?: () => void;
};

export function resolveOpenState({
  open,
  onOpenChange,
  isVisible,
  onClose,
}: OpenStateProps) {
  const resolvedOpen = open ?? isVisible ?? false;

  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (!next) onClose?.();
  };

  return { open: resolvedOpen, setOpen };
}
