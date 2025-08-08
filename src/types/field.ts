export type FieldType = "text" | "url" | "rich-text" | "urls" | "reference";
export type Field = {
  name: string;
  type: FieldType;
  required: boolean;
};
