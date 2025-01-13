import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

interface StatusOption {
  value: string;
  label: string;
  color: string;
}

interface StatusModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  initialStatusOptions: StatusOption[];
  handleAddStatus: (newStatus: string, newStatusColor: string) => void;
  handleEditStatus: (
    statusValue: string,
    editLabel: string,
    editColor: string
  ) => void;
  handleDeleteStatus: (value: string) => void;
  handleUpdateStatusOrder: (updatedStatusOptions: StatusOption[]) => void; // New prop
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onRequestClose,
  initialStatusOptions,
  handleAddStatus,
  handleEditStatus,
  handleDeleteStatus,
  handleUpdateStatusOrder,
}) => {
  const [newStatus, setNewStatus] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#000000");
  const [editingStatus, setEditingStatus] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editColor, setEditColor] = useState("");

  const [statusOptions, setStatusOptions] =
    useState<StatusOption[]>(initialStatusOptions);

  // Update local state whenever initialStatusOptions changes
  useEffect(() => {
    setStatusOptions(initialStatusOptions);
  }, [initialStatusOptions]);

  if (!isOpen) return null;

  const saveEditedStatus = () => {
    if (editingStatus) {
      handleEditStatus(editingStatus, editLabel, editColor);
      setEditingStatus(null);
      setEditLabel("");
      setEditColor("");
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    if (fromIndex !== index) {
      const updatedOptions = Array.from(statusOptions);
      const [movedItem] = updatedOptions.splice(fromIndex, 1);
      updatedOptions.splice(index, 0, movedItem);
      setStatusOptions(updatedOptions);
      handleUpdateStatusOrder(updatedOptions); // Call the handler to update order
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <div className="flex justify-end">
          <button onClick={onRequestClose} className="text-gray-600">
            <CgClose size={20} className="mx-auto" />
          </button>
        </div>

        <h2 className="text-lg font-bold mb-4">Manage Status</h2>

        {/* Add new status section */}
        <div className="add-status mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="New status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="p-2 rounded-md bg-gray-100 outline-none w-full"
          />
          <input
            type="color"
            value={newStatusColor}
            onChange={(e) => setNewStatusColor(e.target.value)}
            className="w-8 h-8 p-0 border-none  outline-none cursor-pointer"
          />
          <button
            onClick={() => {
              handleAddStatus(newStatus, newStatusColor);
              setNewStatus("");
              setNewStatusColor("#000000");
            }}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Editing and Deleting existing status */}
        <div className="edit-status mt-2">
          {statusOptions.map((option, index) => (
            <div
              key={option.value}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()} // Allow drop
              onDrop={(e) => onDrop(e, index)}
              className="flex items-center justify-between p-1 border-b"
            >
              {editingStatus === option.value ? (
                <>
                  <input
                    type="text"
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className="p-1 rounded-md bg-gray-100 outline-none w-full"
                  />
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={editColor}
                      onChange={(e) => setEditColor(e.target.value)}
                      className="w-8 h-8 ml-2 p-0 border-none outline-none cursor-pointer"
                    />
                    <FaSave
                      className="text-green-500 cursor-pointer ml-2"
                      onClick={saveEditedStatus}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center">
                    <MdDragIndicator className="text-gray-500 cursor-move" />
                    <span
                      style={{
                        border: `1px solid ${option.color}`,
                        color: option.color,
                        padding: "2px 5px",
                        borderRadius: "10px",
                        backgroundColor: "transparent",
                      }}
                    >
                      {option.label}
                    </span>
                  </div>

                  <div className="flex">
                    <FaEdit
                      className="text-blue-500 cursor-pointer ml-2"
                      onClick={() => {
                        setEditingStatus(option.value);
                        setEditLabel(option.label);
                        setEditColor(option.color);
                      }}
                    />
                    <FaTrash
                      className="text-red-500 cursor-pointer ml-2"
                      onClick={() => handleDeleteStatus(option.value)}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
