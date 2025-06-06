import css from "./NoteModal.module.css";
import { createPortal } from "react-dom";

interface NoteModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function NoteModal({ onClose, children }: NoteModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
