import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { useModalStore } from "@/store/modal-store";
import { ModalComponentProps } from "@/types/modal-component-props";

const Modal = (props: ModalComponentProps) => {
  const { activeModal, closeModal } = useModalStore();
  const {
    modalName,
    title,
    description,
    confirmButtonText,
    cancelButtonText,
    body,
    handleConfirm,
    isProcessing,
    isProcessingText,
    disabled,
  } = props;
  return (
    <Credenza open={activeModal === modalName} onOpenChange={closeModal}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>{title}</CredenzaTitle>
          <CredenzaDescription>{description}</CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>{body}</CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant="outline" disabled={isProcessing}>
              {cancelButtonText ?? "Cancel"}
            </Button>
          </CredenzaClose>
          <Button onClick={handleConfirm} disabled={isProcessing || disabled}>
            {isProcessing ? (
              <>
                <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                {isProcessingText ? isProcessingText : confirmButtonText}
              </>
            ) : (
              (confirmButtonText ?? "OK")
            )}
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};

export default Modal;
