export type ModalComponentProps = {
  modalName: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  icon?: string;
  iconClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  confirmButtonText?: string | React.ReactNode;
  cancelButtonText?: string | React.ReactNode;
  body?: string | React.ReactNode;
  handleConfirm?: () => void;
  isProcessing?: boolean;
  isProcessingText?: string;
  disabled?: boolean;
};
