export const safeMapFields = (
  fields: any[] | undefined,
  callback: (field: any, index: number) => JSX.Element
): JSX.Element[] | null => {
  if (Array.isArray(fields) && fields.length > 0) {
    return fields.map((field, index) => callback(field, index));
  }
  return null;
};

export const cleanFieldId = (data: any): any => {
  data.fields.custom.forEach((field: any) => {
    field.fieldId = field.fieldId._id;
  });

  return data;
};

/**
 * Replaces placeholders in a path template with actual values from a params object.
 *
 * @param template - The path template with placeholders, e.g., "projects/:currentProjectId/images/:imageId".
 * @param params - An object containing parameter values to replace in the template.
 * @returns The path with replaced values.
 */
export function replacePathParams(
  template: string,
  params: Record<string, string | number>
): string {
  return template.replace(/:([a-zA-Z]+)/g, (_, key) => {
    if (params[key] === undefined) {
      console.warn(`No value provided for parameter: ${key}`);
      return `:${key}`; // Leave the placeholder if not found in params
    }
    return String(params[key]);
  });
}
