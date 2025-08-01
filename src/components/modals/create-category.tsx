import { useState } from "react";
import { z } from "zod";

import Modal from "@/components/modals/modal";
import { Input } from "@/components/ui/input";
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

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
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
    if (error || !categoryName) return;
    logger.debug("Create:", categoryName);
    // TODO: Call API or mutate
  };

  return (
    <Modal
      modalName="create-category"
      title="Create category"
      description="Create a new category to group your content."
      confirmButtonText="Create"
      handleConfirm={handleConfirm}
      body={
        <div className="flex flex-col gap-4">
          <Input value={categoryName} onChange={handleChange} placeholder="Category name" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      }
    />
  );
};

export default CreateCategory;
