"use client";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";

import Modal from "@/components/modals/modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldType } from "@/types/field";

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);

  return (
    <Modal
      modalName="create-project"
      title="Create Project"
      className="sm:max-w-full w-[760px]"
      confirmButtonText="Create"
      body={
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-12 gap-2 pb-4 border-b">
            <div className="col-span-6">
              <Label>Field name</Label>
            </div>
            <div className="col-span-4">
              <Label>Field type</Label>
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Label>Required</Label>
            </div>
          </div>
          {fields.length > 0 ? (
            fields.map((field, index) => (
              <div key={index} className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <Input
                    value={field.name}
                    onChange={(e) => {
                      setFields(
                        fields.map((f, i) => (i === index ? { ...f, name: e.target.value } : f))
                      );
                    }}
                  />
                </div>

                <div className="col-span-4">
                  <Select
                    defaultValue={field.type}
                    onValueChange={(value) =>
                      setFields(
                        fields.map((f, i) => (i === index ? { ...f, type: value as FieldType } : f))
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select field type" defaultValue={field.type} />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectItem value="text" title="Text max 255 characters or less">
                        Text
                      </SelectItem>
                      <SelectItem value="rich-text" title="Long text">
                        Rich text
                      </SelectItem>
                      <SelectItem value="url" title="Single image/video url">
                        Image/video
                      </SelectItem>
                      <SelectItem value="urls" title="Multiple image/video urls">
                        Multi image/video
                      </SelectItem>
                      <SelectItem value="reference" title="Reference to other content">
                        Reference
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-1 flex justify-center items-center">
                  <Checkbox
                    className="size-6"
                    checked={field.required}
                    title="If checked, this field is required and cannot be left blank. If unchecked, this field is optional."
                    onClick={() =>
                      setFields(
                        fields.map((f, i) => (i === index ? { ...f, required: !f.required } : f))
                      )
                    }
                  />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Delete field"
                    onClick={() => setFields(fields.filter((f, i) => i !== index))}
                  >
                    <XIcon />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-10 flex justify-center items-center">
              No fields defined yet. You can add fields by clicking the Add field button.
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => setFields([...fields, { name: "", type: "text", required: false }])}
          >
            <PlusIcon />
            Add field
          </Button>
        </div>
      }
    />
  );
};

export default CreateProject;
