import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Header, RowData } from "../../models/tableModel";
import { useToast } from "./../../context/ToastProvider";
import { useItem } from "../../hooks/useItem";
import { Item } from "../../models/itemModels";
import { cleanFieldId } from "../../utils/useRender";

type ImportFooterProps = {
  currentStep: number;
  onStepClick: (step: number) => void;
  rows: RowData[] | null;
  headers: Header[] | null;
};

export const ImportFooter = ({
  currentStep,
  onStepClick,
  rows,
  headers,
}: ImportFooterProps) => {
  const { item, updateItem } = useItem();
  const { showToast } = useToast();
  console.log(rows, headers);
  const handleNext = async () => {
    onStepClick(currentStep + 1);

    if (currentStep > 1) {
      onStepClick(2);
      if (rows && headers) {
        try {
          const updatedItemData: Item = {
            ...item,
            fields: {
              common: item?.fields?.common || [],
              custom: (item?.fields?.custom || []).map((customField) => {
                const updatedField = {
                  ...customField,
                  fieldId: {
                    ...customField.fieldId,
                    _id: customField.fieldId._id,
                  },
                };

                if (customField.fieldId.name === "Attendees") {
                  updatedField.value = rows;
                }

                if (customField.fieldId.name === "Fields") {
                  updatedField.value = headers;
                }

                return updatedField;
              }),
            },
          };

          const response = await updateItem(cleanFieldId(updatedItemData));

          if (response) {
            showToast(
              "Successfully updated item",
              "success",
              "bottom-10 right-10"
            );
          }
        } catch (error) {
          console.error("Error updating item data:", error);
        }
      }
    }
  };

  const handlePrevious = () => {
    onStepClick(currentStep - 1);

    if (currentStep < 1) {
      onStepClick(0);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-row justify-between  bg-white shadow-md border-t p-5 border-gray-300">
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={handlePrevious}
          type="button"
          className="bg-secondary-base hover:bg-secondary-hover font-semibold py-2 px-4 rounded border border-blue-400 text-blue-700 flex items-center justify-center gap-4 hover:bg-blue-400 hover:text-white "
        >
          <IoIosArrowBack /> {currentStep > -1 ? `Back` : `Cancel`}
        </button>
        <button
          type="button"
          className={`${
            currentStep < 1 && `hidden`
          } bg-secondary-base hover:bg-secondary-hover font-semibold py-2 px-4 rounded border border-red-400 text-red-700 flex items-center justify-center gap-4 hover:bg-red-400 hover:text-white `}
        >
          <IoIosArrowBack /> Cancel
        </button>
      </div>
      <div className="flex flex-row items-center">
        <button
          onClick={handleNext}
          type="button"
          className="bg-primary-base hover:bg-primary-hover font-semibold py-2 px-4 rounded border border-blue-400 text-blue-700 flex items-center justify-center gap-4 hover:bg-blue-400 hover:text-white "
        >
          {currentStep < 2 ? `Next` : "Save"} <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};
