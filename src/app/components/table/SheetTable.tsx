import React, { useState } from "react";
import { PiPlusCircleFill } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai"; // Import delete icon
import { GiJigsawBox } from "react-icons/gi";
import { Field } from "../../models/fieldModels";
import { ATTENDACE_FIELD } from "../../config/fieldConfig";
import StatusDropdown from "../selects/StatusDropdown";
import { Header, RowData, StatusOption } from "../../models/tableModel";
import { formatDateToMMMDDYYYY, formatTimeToAMPM } from "../../utils/useDate";
import { FiX } from "react-icons/fi";

export type SheetTableProps = {
  headers: Header[] | [];
  initialRows?: RowData[];
  onSave?: (headers: Header[], rows: RowData[]) => void;
  setEditMode?: (isEditMode: boolean) => void;
  isEditMode?: boolean;
  setHeaders?: React.Dispatch<React.SetStateAction<Header[]>>;
  setRows?: React.Dispatch<React.SetStateAction<RowData[]>>;
};

export const SheetTable = ({
  headers = [],
  initialRows: rows = [],
  onSave,
  isEditMode = false,
  setEditMode = () => {},
  setHeaders = () => {},
  setRows = () => {},
}: SheetTableProps) => {
  // const [headers, setHeaders] = useState<Header[]>(initialHeaders);
  // const [rows, setRows] = useState<RowData[]>(initialRows);
  console.log(rows);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const [draggedColumnIndex, setDraggedColumnIndex] = useState<number | null>(
    null
  );

  // Handle drag start
  const handleDragStart = (index: number) => {
    setDraggedColumnIndex(index);
  };

  // Handle dropping the dragged column
  const handleDrop = (dropIndex: number) => {
    if (draggedColumnIndex !== null) {
      const updatedHeaders = [...headers];
      const [draggedHeader] = updatedHeaders.splice(draggedColumnIndex, 1);
      updatedHeaders.splice(dropIndex, 0, draggedHeader);

      if (setHeaders) setHeaders(updatedHeaders);
      setDraggedColumnIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle value changes in the table cells
  const handleCellChange = (
    rowIndex: number,
    headerType: string,
    value: string | string[]
  ) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][headerType] = value;
    setRows(updatedRows);
  };

  // Add a new row
  const addRow = () => {
    const newRow: RowData = {};
    headers.forEach(
      (header) =>
        (newRow[header.type] = header.fieldType === "multiselect" ? [] : "")
    );
    setRows([...rows, newRow]);
  };

  // Add a selected field as a new header (column)
  const addHeaderFromField = () => {
    if (!selectedField) return;

    const statusOptions: StatusOption[] = [
      { value: "option1", label: "Option 1", color: "#4caf50" }, // Green
      { value: "option2", label: "Option 2", color: "#f44336" }, // Red
    ];

    const newHeader: Header = {
      id: headers.length + 1,
      name: selectedField.label,
      type: selectedField.name,
      fieldType: selectedField.type,
      option: selectedField.name === "status" ? statusOptions : [],
    };
    setHeaders([...headers, newHeader]);

    // Update existing rows to include the new column
    const updatedRows = rows.map((row) => ({
      ...row,
      [selectedField.name as any]:
        selectedField.type === "multiselect" ? [] : "",
    }));
    setRows(updatedRows);

    // Reset field selection and close the modal
    setSelectedField(null);
    setShowAddColumnModal(false);
  };

  // Delete a header (and its associated column in all rows)
  const deleteHeader = (headerType: string) => {
    const updatedHeaders = headers.filter(
      (header) => header.type !== headerType
    );
    setHeaders(updatedHeaders);

    // Update rows by removing the corresponding column data
    const updatedRows = rows.map((row) => {
      const updatedRow = { ...row };
      delete updatedRow[headerType];
      return updatedRow;
    });
    setRows(updatedRows);
  };

  const handleSave = () => {
    onSave && onSave(headers, rows);
    setEditMode && setEditMode(false);
  };

  const deleteRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  return (
    <div>
      <div className="overflow-auto max-h-[75vh] mt-4 border-b-2 py-1 border-gray-200">
        {headers?.length > 0 ? (
          <div className="relative mx-4 ">
            <table className="table-auto w-full border rounded-t-lg border-gray-300">
              <thead className="  ">
                <tr className="bg-gray-100 sticky -top-[0.30rem] z-10 ">
                  {headers.map((header, index) => (
                    <th
                      key={header.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      className="border-y border-gray-300 px-4 py-2 text-left cursor-move text-gray-500 font-normal bg-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        {header.name}
                        {isEditMode && (
                          <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => deleteHeader(header.type)}
                          >
                            <AiOutlineDelete size={16} />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  {isEditMode && (
                    <th className="relative">
                      <button
                        className="absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-500 hover:text-green-500"
                        onClick={() => setShowAddColumnModal(true)}
                      >
                        <PiPlusCircleFill size={20} />
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-y border-gray-300">
                    {headers.map((header) => (
                      <td key={header.id} className="border-y border-gray-300">
                        {header.fieldType === "singletext" && (
                          <>
                            {isEditMode ? (
                              <input
                                type="text"
                                value={row[header.type] as string}
                                onChange={(e) =>
                                  handleCellChange(
                                    rowIndex,
                                    header.type,
                                    e.target.value
                                  )
                                }
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 "
                              />
                            ) : (
                              <div className="text-slate-700 text-sm px-4">
                                {row[header.type] as string}
                              </div>
                            )}
                          </>
                        )}
                        {header.fieldType === "multiselect" && (
                          <select
                            multiple
                            value={row[header.type] as string[]}
                            onChange={(e) =>
                              handleCellChange(
                                rowIndex,
                                header.type,
                                Array.from(
                                  e.target.selectedOptions,
                                  (option) => option.value
                                )
                              )
                            }
                            className="w-full p-1 border rounded"
                          >
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                          </select>
                        )}
                        {header.fieldType === "singleselect" &&
                          header.type === "status" && (
                            <>
                              <StatusDropdown
                                row={row}
                                header={header}
                                isEditMode={isEditMode}
                                rowIndex={rowIndex}
                                handleCellChange={handleCellChange}
                                statusOptions={header.option || []} // Use status options from header
                                setStatusOptions={(newOptions) => {
                                  if (!Array.isArray(newOptions)) {
                                    console.error(
                                      "newOptions is not an array:",
                                      newOptions
                                    );
                                    return;
                                  }

                                  setHeaders((prevHeaders) =>
                                    prevHeaders.map((h) =>
                                      h.id === header.id
                                        ? { ...h, option: [...newOptions] }
                                        : h
                                    )
                                  );
                                }}
                                onAddStatus={(newStatus, newStatusColor) => {
                                  const newStatusOption = {
                                    value: newStatus,
                                    label: newStatus,
                                    color: newStatusColor,
                                  };
                                  setHeaders((prevHeaders) =>
                                    prevHeaders.map((h) =>
                                      h.id === header.id
                                        ? {
                                            ...h,
                                            option: [
                                              ...(h.option || []),
                                              newStatusOption,
                                            ],
                                          }
                                        : h
                                    )
                                  );
                                }}
                                onDeleteStatus={(statusValue) => {
                                  setHeaders((prevHeaders) =>
                                    prevHeaders.map((h) =>
                                      h.id === header.id
                                        ? {
                                            ...h,
                                            option: (h.option || []).filter(
                                              (opt) => opt.value !== statusValue
                                            ),
                                          }
                                        : h
                                    )
                                  );
                                }}
                                onEditStatus={(
                                  statusValue,
                                  editLabel,
                                  editColor
                                ) => {
                                  setHeaders((prevHeaders) =>
                                    prevHeaders.map((h) =>
                                      h.id === header.id
                                        ? {
                                            ...h,
                                            option: (h.option || []).map(
                                              (opt) =>
                                                opt.value === statusValue
                                                  ? {
                                                      ...opt,
                                                      label: editLabel,
                                                      color: editColor,
                                                    }
                                                  : opt
                                            ),
                                          }
                                        : h
                                    )
                                  );
                                }}
                              />
                            </>
                          )}

                        {header.fieldType === "time" && (
                          <>
                            {isEditMode ? (
                              <input
                                type="time"
                                value={row[header.type] as string}
                                onChange={(e) =>
                                  handleCellChange(
                                    rowIndex,
                                    header.type,
                                    e.target.value
                                  )
                                }
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 "
                              />
                            ) : (
                              <div className="text-slate-700 text-sm px-4">
                                {" "}
                                {formatTimeToAMPM(
                                  row[header.type] as string
                                ) === "Invalid time input"
                                  ? "---"
                                  : formatTimeToAMPM(
                                      row[header.type] as string
                                    )}{" "}
                              </div>
                            )}
                          </>
                        )}
                        {header.fieldType === "date" && (
                          <>
                            {isEditMode ? (
                              <input
                                type="date"
                                value={row[header.type] as string}
                                onChange={(e) =>
                                  handleCellChange(
                                    rowIndex,
                                    header.type,
                                    e.target.value
                                  )
                                }
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 "
                              />
                            ) : (
                              <div className="text-slate-700 text-sm px-4">
                                {formatDateToMMMDDYYYY(
                                  row[header.type] as string
                                ) === "Invalid date input"
                                  ? "---"
                                  : formatDateToMMMDDYYYY(
                                      row[header.type] as string
                                    )}
                              </div>
                            )}
                          </>
                        )}
                      </td>
                    ))}
                    {isEditMode && (
                      <td className="relative ">
                        <button
                          className="absolute top-1/2 right-1 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                          onClick={() => deleteRow(rowIndex)}
                        >
                          <FiX size={15} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows && rows.length === 0 && (
              <div className="bg-gray-0 p-6 border ">
                <GiJigsawBox size={50} className="mx-auto text-gray-400" />

                <p className=" text-center text-gray-400">No data</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {isEditMode && (
              <div className="flex items-center justify-between">
                <div className="flex-grow bg-gray-200 h-[2px]"></div>
                <button
                  className="flex items-center py-2 rounded ml-2 text-gray-500 hover:text-green-500"
                  onClick={() => setShowAddColumnModal(true)}
                >
                  <p className="mr-2 text-xs">Add Column</p>
                  <PiPlusCircleFill size={20} />
                </button>
              </div>
            )}
            <div className="overflow-auto max-h-[80vh]"></div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <GiJigsawBox size={50} className="mx-auto text-gray-400" />

              <p className=" text-center text-gray-400">No data</p>
            </div>
          </>
        )}

        {showAddColumnModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">
                Add New Header (Column)
              </h2>
              <div className="flex flex-col space-y-4">
                <select
                  value={selectedField?.label || ""}
                  onChange={(e) =>
                    setSelectedField(
                      ATTENDACE_FIELD.find(
                        (field) => field.label === e.target.value
                      ) || null
                    )
                  }
                  className="p-2 border rounded"
                >
                  <option value="">Select a field</option>
                  {ATTENDACE_FIELD.map((field) => (
                    <option key={field.name} value={field.label}>
                      {field.label}
                    </option>
                  ))}
                </select>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setShowAddColumnModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addHeaderFromField}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Column
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isEditMode && headers.length > 0 && (
        <>
          <div className="flex items-center justify-between px-2">
            <button
              className="flex items-center  rounded ml-2 text-gray-500 hover:text-green-500"
              onClick={addRow}
            >
              {/* <p className="mr-2 text-xs">Add Row</p> */}
              <PiPlusCircleFill size={20} />
            </button>
            {/* <div className="flex-grow bg-gray-200 h-[2px]"></div> */}
          </div>
          <div className="flex justify-end px-4">
            <button
              onClick={handleSave}
              className="flex items-center py-1 rounded bg-green-500 text-white px-3"
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};
