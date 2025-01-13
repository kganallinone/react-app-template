import { Field } from "../models/fieldModels";

export function findFieldValue(
  data: Field[],
  search: string,
  fieldName: keyof Field
): string[] {
  const matchingValues = data
    .filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    )
    .map((item) => item[fieldName])
    .filter((value) => value !== undefined) as string[];

  return matchingValues;
}

export const getFieldValue = (item: any, type: any, fieldName: string): any => {
  if (!item || !item.fields || !item.fields[type]) {
    return ""; // Return an empty string or handle as needed when item, fields, or the specific type doesn't exist
  }

  const field = item.fields[type].find(
    (field: any) => field.fieldId.name === fieldName
  )?.value;

  if (typeof field === "string" || typeof field === "object") {
    return field;
  }

  return "";
};
