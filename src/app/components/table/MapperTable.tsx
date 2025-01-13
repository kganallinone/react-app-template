import { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import { ImportAsSelect } from "../selects/ImportAsSelect";
import { ATTENDACE_FIELD } from "../../config/fieldConfig";
import { PropertiesSelect } from "../selects/PropertiesSelect";
import { CircularCheckbox } from "../inputs/CircularCheckbox";
import { Header, RowData } from "../../models/tableModel";
import { findFieldValue } from "../../utils/useDataFinder";

type TableRow = {
  columnHeader: string;
  preview: string;
  mapped: boolean;
  importAs: string;
  property: string;
  manageValues: string;
};

type MapperTableProps = {
  file: File | null;
  setData: React.Dispatch<React.SetStateAction<RowData[] | null>>;
  setHeaders: React.Dispatch<React.SetStateAction<Header[] | null>>; // Add setHeaders prop
};

const MapperTable = ({ file, setData, setHeaders }: MapperTableProps) => {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  useEffect(() => {
    const parseExcelFile = async () => {
      if (!file) return;

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      if (jsonData.length < 2) return;

      const headerRow = jsonData[0];

      const previewData: TableRow[] = headerRow.map((header: string) => ({
        columnHeader: header || "",
        preview: "",
        mapped: false,
        importAs: "",
        property: "",
        manageValues: "",
      }));

      jsonData.slice(1).forEach((row: any[]) => {
        row.forEach((cell: any, index: number) => {
          if (previewData[index]) {
            previewData[index].preview +=
              (previewData[index].preview ? ", " : "") + (cell || "");
          }
        });
      });

      setRows(previewData);
    };

    parseExcelFile();
  }, [file]);

  useEffect(() => {
    const selectedPropertiesList = rows
      .map((row) => {
        const matchedProperty = ATTENDACE_FIELD.find((option) =>
          option.similarHeaders?.some(
            (similarHeader) =>
              similarHeader.toLowerCase() === row.columnHeader.toLowerCase()
          )
        );
        return row.property || matchedProperty?.name;
      })
      .filter(Boolean) as string[];

    setSelectedProperties((prevSelected) => {
      const newSelected = [
        ...new Set([...prevSelected, ...selectedPropertiesList]),
      ];
      if (JSON.stringify(newSelected) !== JSON.stringify(prevSelected)) {
        return newSelected;
      }
      return prevSelected; // Return previous state if no change
    });
  }, [rows]);

  useEffect(() => {
    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        const matchedProperty = ATTENDACE_FIELD.find((option) =>
          option.similarHeaders?.some(
            (similarHeader) =>
              similarHeader.toLowerCase() === row.columnHeader.toLowerCase()
          )
        );
        const property = row.property || matchedProperty?.name || "";
        const importAsFilled = row.importAs !== ""; // Check if importAs is filled
        const propertyFilled = property !== ""; // Check if property is filled
        const mapped = importAsFilled && propertyFilled; // Set mapped based on importAs and property

        return {
          ...row,
          property,
          mapped,
        };
      });

      // Only update rows if they have changed
      if (JSON.stringify(newRows) !== JSON.stringify(prevRows)) {
        return newRows;
      }
      return prevRows; // Return previous state if no change
    });
  }, [rows]);

  const handleImportAsChange = useCallback((value: string, index: number) => {
    setRows((prevRows) => {
      const updatedRow = prevRows[index];

      if (value === "dont_import") {
        return prevRows.map((r, i) =>
          i === index
            ? { ...updatedRow, property: "", mapped: false, importAs: value }
            : r
        );
      } else {
        return prevRows.map((r, i) =>
          i === index ? { ...updatedRow, importAs: value } : r
        );
      }
    });
  }, []);

  const handleSeeMore = (preview: string) => {
    setModalContent(preview);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  useEffect(() => {
    const saveData = async () => {
      const headersToSave: Header[] = [];
      const rowsToSave: RowData[] = [];

      rows.forEach((row, index) => {
        if (row.importAs !== "dont_import") {
          // Retrieve label and type for the given property
          const headerName = findFieldValue(
            ATTENDACE_FIELD,
            row.property,
            "label"
          );
          const headerType = findFieldValue(
            ATTENDACE_FIELD,
            row.property,
            "type"
          );

          // Check if the returned values are defined
          if (headerName && headerType) {
            const header = {
              id: index, // Or use a unique ID
              name: headerName[0],
              type: row.property,
              fieldType: headerType[0],
            };

            headersToSave.push(header);
          } else {
            console.warn(
              `Warning: Could not find matching values for row at index ${index}`
            );
          }
        }
      });

      if (!file) return;

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      const filteredHeaders = rows.filter(
        (header) => header.importAs !== "dont_import"
      );

      const indicesToKeep = filteredHeaders.map((header) =>
        jsonData[0].indexOf(header.columnHeader)
      );

      const filteredData = jsonData.map((row) => {
        return indicesToKeep.map((index) => row[index]);
      });

      const result = [
        filteredHeaders.map((header) => header.columnHeader),
        ...filteredData,
      ];

      const convertedData = result.slice(2).map((row) => {
        const entry: { [key: string]: any } = {};
        row.forEach((value, index) => {
          const header = headersToSave[index];

          const key = header.type || header.name;
          entry[key] = key === "status" ? [value] : value;
        });
        return entry;
      });

      rowsToSave.push(...convertedData);

      const uniqueStatuses = [
        ...new Set(convertedData.flatMap((entry) => entry.status)),
      ];
      const getRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      };

      // Convert unique statuses to the desired format
      const formattedStatuses = uniqueStatuses
        .filter((status) => status) // Ensure status is not undefined or falsy
        .map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
          color: getRandomColor(),
          value: status,
        }));

      const formattedHeaders = headersToSave.map((header) => {
        if (header.type === "status") {
          return {
            ...header,
            option: formattedStatuses,
          };
        }
        return header;
      });

      setHeaders(formattedHeaders);
      setData(rowsToSave);
    };

    saveData();
  }, [rows, setData, setHeaders]);

  return (
    <div className="overflow-x-auto mx-[100px] max-h-[500px] h-[500px]">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
              Header Name from file
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
              Preview
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-center">
              Mapped
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">
              Import As
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">
              Property
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 text-left">
              Manage Existing Values
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-700">
                {row.columnHeader}
              </td>
              <td className="px-4 py-2 text-sm text-gray-500">
                <div>
                  {row.preview
                    .split(", ")
                    .slice(0, 2)
                    .map((preview, index) => (
                      <p key={index}>{preview}</p>
                    ))}
                  {row.preview.split(", ").length > 2 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleSeeMore(row.preview)}
                    >
                      See More
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                <CircularCheckbox checked={row.mapped} />
              </td>
              <td className="px-4 py-2">
                <ImportAsSelect
                  header={row.columnHeader}
                  fields={ATTENDACE_FIELD}
                  value={row.importAs}
                  onChange={(value) => handleImportAsChange(value, index)}
                />
              </td>
              <td className="px-4 py-2">
                <PropertiesSelect
                  header={row.columnHeader}
                  options={ATTENDACE_FIELD}
                  selectedValue={row.property}
                  selectedProperties={selectedProperties}
                  onChange={(value) => {
                    setRows((prevRows) =>
                      prevRows.map((r, i) =>
                        i === index ? { ...r, property: value } : r
                      )
                    );
                  }}
                />
              </td>
              <td className="px-4 py-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    aria-label="Manage Checkbox"
                  />
                  <span className="ml-2 text-sm">Don't overwrite</span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-11/12 md:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Full Preview</h2>
            <p>{modalContent}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapperTable;
