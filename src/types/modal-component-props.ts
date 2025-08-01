export type ModalComponentProps = {
  modalName: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  confirmButtonText?: string | React.ReactNode;
  cancelButtonText?: string | React.ReactNode;
  body?: string | React.ReactNode;
  handleConfirm?: () => void;
  isProcessing?: boolean;
  isProcessingText?: string;
  disabled?: boolean;
};
