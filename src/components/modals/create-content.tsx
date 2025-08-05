/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { z } from "zod";

import Modal from "@/components/modals/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useModalStore } from "@/store/modal-store";
import { logger } from "@/utils/logger";

const CreateContent = () => {
  const { modalData: project } = useModalStore();

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const schema = useMemo(() => {
    if (!project) return z.object({});

    const shape: Record<string, any> = {};

    for (const field of project.model) {
      if (field.type === "text") {
        shape[field.field] = z.string().max(255, "Must be 255 characters or less").optional();
        if (field.required)
          shape[field.field] = shape[field.field].refine((val: any) => !!val, {
            message: "Required",
          });
      } else if (field.type === "rich-text") {
        shape[field.field] = z.string().min(1, "Required");
      } else if (field.type === "url") {
        shape[field.field] = z.url("Invalid URL").optional();
        if (field.required)
          shape[field.field] = shape[field.field].refine((val: any) => !!val, {
            message: "Required",
          });
      } else if (field.type === "urls") {
        shape[field.field] = z.array(z.url("Invalid URL")).optional();
      }
    }

    return z.object(shape);
  }, [project]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    setFormErrors({}); // reset errors

    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        errors[key] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    logger.debug("✅ Submit data:", result.data);
  };

  if (!project) return null;

  const renderField = (fieldDef: { field: string; type: string; required?: boolean }) => {
    const { field, type } = fieldDef;
    const label = field.replaceAll("_", " ");
    const error = formErrors[field];

    if (type === "text" || type === "url") {
      return (
        <div key={field} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Input
            placeholder={`Enter ${label}`}
            value={formData[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      );
    }

    if (type === "rich-text") {
      return (
        <div key={field} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">{label}</Label>
          <Textarea
            placeholder={`Enter ${label}`}
            rows={6}
            value={formData[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      );
    }

    if (type === "urls") {
      return (
        <div key={field} className="flex flex-col gap-2">
          <Label className="text-sm font-medium">{label} (one per line)</Label>
          <Textarea
            placeholder="https://a.com\nhttps://b.com"
            rows={5}
            value={(formData[field] || []).join("\n")}
            onChange={(e) => {
              const urls = e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean);
              handleChange(field, urls);
            }}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      modalName="create-content"
      title="Create Content"
      body={
        <div className="space-y-6">
          {project.model.map((fieldDef: any) => renderField(fieldDef))}
        </div>
      }
      confirmButtonText="Create"
      handleConfirm={handleSubmit}
    />
  );
};

export default CreateContent;
