import { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import CustomSelect from "./CustomSelect";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Input from "../inputs/Input";
import { safeMapFields } from "../../utils/useRender";
import { FiX } from "react-icons/fi";
import LocationSelect from "./LocationSelect";
import { useToast } from "../../context/ToastProvider";
import { formatDateTimeLocal } from "../../utils/useDate";

type CustomFieldSelectProps = {
  customField?: any[];
  formData?: any;
  handleCustomField?: (value: any[]) => void;
  projectCustomField?: any[];
  handleFieldChange?: (fieldId: string, value: any) => void;
};

export const CustomFieldSelect = ({
  customField,
  formData,
  handleCustomField,
  projectCustomField,
  handleFieldChange,
}: CustomFieldSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  console.log(formData);

  return (
    <div>
      <div className="max-h-[70vh] overflow-y-auto">
        {customField && customField.length > 0 ? (
          <>
            {safeMapFields(customField, (item) => {
              const customFieldData = formData.fields.custom.find(
                (field: any) => field.fieldId === item._id
              );

              let value: any = "";

              if (item.type === "object" && item.name === "Location") {
                value =
                  customFieldData && typeof customFieldData.value === "object"
                    ? { ...customFieldData.value }
                    : {
                        address: "",
                        lat: "",
                        lng: "",
                        details: {
                          region: {
                            name: "",
                            code: "",
                          },
                          province: {
                            name: "",
                            code: "",
                          },
                          city: {
                            name: "",
                            code: "",
                          },
                          barangay: {
                            name: "",
                            code: "",
                          },
                          street: "",
                          house_no: "",
                          postal_code: "",
                        },
                      };
              } else {
                value = customFieldData ? customFieldData.value : "";
              }

              return (
                <div key={item._id}>
                  {item.type === "singletext" ? (
                    <Input
                      key={item._id}
                      id={item._id}
                      label={`${item.name} (optional)`}
                      type="text"
                      value={value as string}
                      placeholder={"Enter " + item.name}
                      isRemovable={true}
                      className="mb-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      // Update value dynamically
                      onChange={(e) =>
                        handleFieldChange &&
                        handleFieldChange(item._id, e.target.value)
                      }
                      onRemove={(id) => {
                        const selectedArray = Array.isArray(customField)
                          ? customField
                          : [];
                        const isSelected = selectedArray.find(
                          (i) => i._id === id
                        );

                        const newSelected = isSelected
                          ? selectedArray.filter((i) => i._id !== id)
                          : [...selectedArray, item];

                        handleCustomField && handleCustomField(newSelected);
                      }}
                    />
                  ) : item.type === "date" && item.name.includes("Datetime") ? (
                    <Input
                      key={item._id}
                      id={item._id}
                      label={
                        item.name === "Start Datetime"
                          ? "Start Date and Time (optional)"
                          : "End Date and Time (optional)"
                      }
                      value={formatDateTimeLocal(value as string)}
                      type="datetime-local"
                      placeholder={
                        item.name === "Start Datetime"
                          ? "Start Date and Time"
                          : "End Date and Time"
                      }
                      isRemovable={true}
                      className="mb-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      dateMin={new Date().toISOString().slice(0, 16)}
                      dateMax={new Date(
                        new Date().setFullYear(new Date().getFullYear() + 5)
                      )
                        .toISOString()
                        .slice(0, 16)}
                      onChange={(e) => {
                        const value = e.target.value;
                        const selectedDate = new Date(value);
                        const currentDate = new Date();

                        if (selectedDate < currentDate) {
                          showToast(
                            "Invalid date, you cannot select a past date.",
                            "error",
                            "bottom-10 right-10"
                          );

                          e.target.value = currentDate
                            .toISOString()
                            .slice(0, 16);
                          return;
                        }

                        const formattedValue = selectedDate.toISOString();
                        handleFieldChange &&
                          handleFieldChange(item._id, formattedValue);
                      }}
                      onRemove={(id) => {
                        const selectedArray = Array.isArray(customField)
                          ? customField
                          : [];
                        const isSelected = selectedArray.find(
                          (i) => i._id === id
                        );

                        const newSelected = isSelected
                          ? selectedArray.filter((i) => i._id !== id)
                          : [...selectedArray, item];

                        handleCustomField && handleCustomField(newSelected);
                      }}
                    />
                  ) : item.type === "date" &&
                    !item.name.includes("Datetime") ? (
                    <Input
                      key={item._id}
                      id={item._id}
                      label={
                        item.name === "Start Datetime"
                          ? "Start Date and Time"
                          : "End Date and Time"
                      }
                      value={value as string}
                      type="date"
                      placeholder={
                        item.name === "Start Datetime"
                          ? "Start Date and Time"
                          : "End Date and Time"
                      }
                      isRemovable={true}
                      className="mb-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) => {
                        const value = e.target.value;
                        const formattedValue = new Date(value)
                          .toISOString()
                          .split("T")[0]; // Ensure only the date part is saved
                        handleFieldChange &&
                          handleFieldChange(item._id, formattedValue);
                      }}
                      onRemove={(id) => {
                        const selectedArray = Array.isArray(customField)
                          ? customField
                          : [];
                        const isSelected = selectedArray.find(
                          (i) => i._id === id
                        );

                        const newSelected = isSelected
                          ? selectedArray.filter((i) => i._id !== id)
                          : [...selectedArray, item];

                        handleCustomField && handleCustomField(newSelected);
                      }}
                    />
                  ) : item.type === "number" ? (
                    <Input
                      key={item._id}
                      id={item._id}
                      label={item.name}
                      value={value as string}
                      type="number"
                      placeholder={"0"}
                      isRemovable={true}
                      className="mb-2 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) =>
                        handleFieldChange &&
                        handleFieldChange(item._id, e.target.value)
                      }
                      onRemove={(id) => {
                        const selectedArray = Array.isArray(customField)
                          ? customField
                          : [];
                        const isSelected = selectedArray.find(
                          (i) => i._id === id
                        );

                        const newSelected = isSelected
                          ? selectedArray.filter((i) => i._id !== id)
                          : [...selectedArray, item];

                        handleCustomField && handleCustomField(newSelected);
                      }}
                    />
                  ) : item.type === "object" && item.name === "Location" ? (
                    <LocationSelect
                      onChange={(locationData) => {
                        if (handleFieldChange) {
                          handleFieldChange(item._id, locationData);
                        }
                      }}
                      onRemove={() => {
                        const selectedArray = Array.isArray(customField)
                          ? customField
                          : [];

                        const newSelected = selectedArray.filter(
                          (i) => i._id !== item._id
                        );

                        handleCustomField && handleCustomField(newSelected);
                      }}
                      defaultBarangayCode={value.details.barangay.code || ""}
                      defaultCityCode={value.details.city.code || ""}
                      defaultProvinceCode={value.details.province.code || ""}
                      defaultRegionCode={value.details.region.code || ""}
                    />
                  ) : (
                    <div className="text-red-500 bg-gray-100 rounded p-2 mb-2 flex items-center justify-between">
                      <p>
                        The field type{" "}
                        <span className="font-bold">{item.name}</span> is not
                        supported
                      </p>
                      <button
                        onClick={() => {
                          const selectedArray = Array.isArray(customField)
                            ? customField
                            : [];
                          const isSelected = selectedArray.find(
                            (i) => i._id === item._id
                          );

                          const newSelected = isSelected
                            ? selectedArray.filter((i) => i._id !== item._id)
                            : [...selectedArray, item];

                          handleCustomField && handleCustomField(newSelected);
                        }}
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="text-red-500 bg-gray-100 rounded p-2">
            <p>No custom field</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-grow bg-gray-200 h-[2px]"></div>
        <button
          className={`${
            isOpen ? "text-green-500" : ""
          } flex items-center py-2 rounded ml-2 text-gray-500 hover:text-green-500`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="mr-2 text-xs">Add Field</p>
          <PiPlusCircle size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 justify-end flex">
          <div className="w-fit bg-white rounded p-2 shadow-sm">
            <CustomSelect
              options={projectCustomField || []}
              isMultiSelect={true}
              selected={customField || []}
              onSelect={(value: any[] | any) =>
                handleCustomField && handleCustomField(value)
              }
              placeholder="Select Custom Field"
              iconArrowUp={<IoIosArrowUp />}
              iconArrowDown={<IoIosArrowDown />}
              className="custom-class"
            />
          </div>
        </div>
      )}
    </div>
  );
};
