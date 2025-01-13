import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import StatusModal from "./../model/StatusModel";

type StatusOption = {
  value: string;
  label: string;
  color: string;
};

type StatusDropdownProps = {
  row: any;
  header: any;
  rowIndex: number;
  handleCellChange: (
    rowIndex: number,
    headerType: string,
    value: string[]
  ) => void;
  statusOptions: StatusOption[];
  setStatusOptions: React.Dispatch<React.SetStateAction<StatusOption[]>>;
  onAddStatus: (newStatus: string, newStatusColor: string) => void;
  onDeleteStatus: (statusValue: string) => void;
  onEditStatus: (
    statusValue: string,
    editLabel: string,
    editColor: string
  ) => void;
  isEditMode?: boolean;
};

const StatusDropdown = ({
  row,
  header,
  rowIndex,
  handleCellChange,
  statusOptions,
  setStatusOptions,
  onAddStatus,
  onDeleteStatus,
  onEditStatus,
  isEditMode = false,
}: StatusDropdownProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    row[header.type] || []
  );
  const [isSelectedStatus, setIsSelectedStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedStatus(selectedValues);
    handleCellChange(rowIndex, header.type, selectedValues);
  };

  const handleDeleteStatus = (statusValue: string) => {
    onDeleteStatus(statusValue);
    const updatedSelected = selectedStatus.filter(
      (status) => status !== statusValue
    );
    setSelectedStatus(updatedSelected);
    handleCellChange(rowIndex, header.type, updatedSelected);
  };

  const toggleEditMode = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="custom-dropdown w-full text-sm">
      {isEditMode ? (
        <div className="selected-status flex items-center gap-1 cursor-pointer">
          <div
            onClick={() => setIsSelectedStatus((prev) => !prev)}
            className="flex gap-1"
          >
            {selectedStatus.length > 0 ? (
              selectedStatus.map((status) => {
                const option = statusOptions.find(
                  (opt) => opt.value === status
                );
                return (
                  <span
                    key={status}
                    style={{
                      border: `1px solid ${option?.color}`,
                      color: option?.color,
                      padding: "2px 5px",
                      borderRadius: "10px",
                      backgroundColor: "transparent",
                    }}
                    className="font-semibold m-1"
                  >
                    {option?.label || status}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400">No status selected</span>
            )}
          </div>
          <FaEdit
            className="text-gray-500 cursor-pointer ml-2"
            onClick={toggleEditMode}
          />
        </div>
      ) : (
        <div className="selected-status flex items-center gap-1 cursor-default">
          {selectedStatus.length > 0 ? (
            selectedStatus.map((status) => {
              const option = statusOptions.find((opt) => opt.value === status);
              return (
                <span
                  key={status}
                  style={{
                    border: `1px solid ${option?.color}`,
                    color: option?.color,
                    padding: "2px 5px",
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                  }}
                  className="font-semibold m-1"
                >
                  {option?.label || status}
                </span>
              );
            })
          ) : (
            <span className="text-gray-400">No status selected</span>
          )}
        </div>
      )}

      {isSelectedStatus && (
        <select
          multiple
          value={selectedStatus}
          onChange={handleSelectChange}
          className="w-full bg-gray-100 p-1 rounded-md outline-none text-gray-700 mt-2"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {/* Show modal for editing statuses */}
      <StatusModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        initialStatusOptions={statusOptions}
        handleAddStatus={onAddStatus}
        handleEditStatus={onEditStatus}
        handleDeleteStatus={handleDeleteStatus}
        handleUpdateStatusOrder={setStatusOptions} // Pass the state setter directly
      />
    </div>
  );
};

export default StatusDropdown;
