export interface SlideOverRootProps {
  children: React.ReactNode;
  className?: string;
}

export interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  blurBackground?: boolean;
  className?: string;
  overlayClassName?: string;
}

export interface SlideOverHeaderProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export interface SlideOverContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface SlideOverFooterProps {
  children: React.ReactNode;
  className?: string;
}
