interface Field {
  id: string;
  label: string;
  type:
    | "singletext"
    | "multitext"
    | "singleselect"
    | "date"
    | "number"
    | "object";
  value?: string | number | { address?: string; lat?: string; lng?: string };
}

interface DynamicFieldProps {
  field: Field;
}

const DynamicField = ({ field }: DynamicFieldProps) => {
  const renderInputField = (): React.ReactNode => {
    switch (field.type) {
      case "singletext":
        return (
          <input
            type="text"
            id={field.id}
            placeholder={field.label}
            defaultValue={field.value as string} // Cast to string
            className="border p-2 rounded"
          />
        );
      case "multitext":
        return (
          <textarea
            id={field.id}
            placeholder={field.label}
            defaultValue={field.value as string} // Cast to string
            className="border p-2 rounded w-full h-24"
          />
        );
      case "singleselect":
        return (
          <select
            id={field.id}
            className="border p-2 rounded"
            defaultValue={field.value as string}
          >
            <option value="" disabled>
              {`Select ${field.label}`}
            </option>
            {/* Populate options based on your data */}
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        );
      case "date":
        return (
          <input
            type="date"
            id={field.id}
            defaultValue={field.value as string} // Cast to string
            className="border p-2 rounded"
          />
        );
      case "number":
        return (
          <input
            type="number"
            id={field.id}
            placeholder={field.label}
            defaultValue={field.value as number} // Cast to number
            className="border p-2 rounded"
          />
        );
      case "object":
        const objectValue = field.value as {
          address?: string;
          lat?: string;
          lng?: string;
        };
        return (
          <div>
            <input
              type="text"
              placeholder="Address"
              defaultValue={objectValue.address} // Handle optional field
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Latitude"
              defaultValue={objectValue.lat} // Handle optional field
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Longitude"
              defaultValue={objectValue.lng} // Handle optional field
              className="border p-2 rounded"
            />
          </div>
        );
      default:
        return null; // Handle unsupported types if needed
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="block mb-1">
        {field.label}
      </label>
      {renderInputField()} {/* Ensure this returns valid JSX */}
    </div>
  );
};

export default DynamicField;
