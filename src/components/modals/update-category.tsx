import { useState } from "react";
import { z } from "zod";

import Modal from "@/components/modals/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/store/modal-store";
import { logger } from "@/utils/logger";

// Zod schema
const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters")
    .regex(/^[a-zA-Z]+(-[a-zA-Z]+)*$/, {
      message: "Only letters and dashes allowed (e.g. 'category-name')",
    }),
});

const UpdateCategory = () => {
  const { modalData: category } = useModalStore();
  const [categoryName, setCategoryName] = useState(category?.name ?? "");
  const [error, setError] = useState<string | null>(null);

  const validateName = (value: string) => {
    const result = categorySchema.safeParse({ name: value });
    if (!result.success) {
      setError(result.error.issues[0].message);
    } else {
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);
    validateName(value);
  };

  const handleConfirm = () => {
    if (error) return;
    // call API here
    logger.debug("Saving:", categoryName);
  };

  return (
    <Modal
      modalName="update-category"
      title="Update Category"
      description="Change the name of this category. This won't affect existing items."
      confirmButtonText="Save"
      handleConfirm={handleConfirm}
      body={
        <div className="flex flex-col gap-4">
          <Label>Category name</Label>
          <Input value={categoryName} onChange={handleChange} />
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
      }
    />
  );
};

export default UpdateCategory;
