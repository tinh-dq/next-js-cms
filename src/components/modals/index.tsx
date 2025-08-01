"use client";

import CreateCategory from "@/components/modals/create-category";
import CreateContent from "@/components/modals/create-content";
import CreateProject from "@/components/modals/create-project";
import DeleteCategory from "@/components/modals/delete-category";
import DeleteContent from "@/components/modals/delete-content";
import DeleteProject from "@/components/modals/delete-project";
import UpdateCategory from "@/components/modals/update-category";
import UpdateContent from "@/components/modals/update-content";
import UpdateProject from "@/components/modals/update-project";
import { useModalStore } from "@/store/modal-store";

const modalComponents: Record<string, React.FC> = {
  "create-project": CreateProject,
  "update-project": UpdateProject,
  "delete-project": DeleteProject,
  "create-category": CreateCategory,
  "update-category": UpdateCategory,
  "delete-category": DeleteCategory,
  "create-content": CreateContent,
  "update-content": UpdateContent,
  "delete-content": DeleteContent,
};
export function ModalProvider() {
  const { activeModal } = useModalStore();
  const ModalComponent = activeModal ? (modalComponents[activeModal] ?? null) : null;

  return ModalComponent ? <ModalComponent /> : null;
}
