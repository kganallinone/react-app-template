import { useState, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FiX } from "react-icons/fi";
import { debounce } from "../../utils/useDebounce";

interface AssigneeSelectProps {
  selectedUsers: any[];
  handleSelectedUsers: (users: any[]) => void;
}

export const AssigneeSelect = ({
  selectedUsers,
  handleSelectedUsers,
}: AssigneeSelectProps) => {
  const { findUser } = useAuth();
  const [searchKey, setSearchKey] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [isBrokenImage, setIsBrokenImage] = useState(false);

  // Debounced function to handle search changes
  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        if (searchTerm.trim()) {
          const result = await findUser(searchTerm);
          setUsers(result || []);
        } else {
          setUsers([]);
        }
      }, 500),
    [findUser] // Delay of 300ms, adjust as needed
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchKey(searchTerm);
    debouncedSearch(searchTerm); // Call the debounced search
  };

  // Handles user selection and allows multiple selection
  const handleUserSelect = (user: any) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      const selected = [...selectedUsers, user];
      handleSelectedUsers(selected);
    } else {
      handleSelectedUsers([user]);
    }

    setSearchKey("");
    setUsers([]);
  };

  // Handles removing a selected user
  const handleRemoveSelected = (userId: string) => {
    handleSelectedUsers(selectedUsers.filter((user) => user._id !== userId));
  };

  return (
    <div className="relative">
      <div className="flex items-center flex-wrap border rounded p-2 w-full bg-white">
        {selectedUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center bg-gray-200 rounded px-2 py-1 mr-2 mb-2"
          >
            <div>
              {isBrokenImage ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-6 h-6 rounded-full mr-2"
                  onError={() => {
                    setIsBrokenImage(true);
                  }}
                />
              ) : (
                <div className="w-6 h-6 rounded-full mr-2 bg-blue-500 items-center flex justify-center ">
                  <span className="text-white text-xs uppercase">
                    {user.firstname[0] + user.lastname[0]}
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium capitalize">
                {user.firstname + " " + user.lastname}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <FiX
              className="ml-2 text-gray-500 cursor-pointer"
              onClick={() => handleRemoveSelected(user._id)}
            />
          </div>
        ))}
        <input
          type="text"
          value={searchKey}
          onChange={handleSearchChange}
          placeholder="Type to search assignees (optional)"
          className="flex-grow p-2 w-full outline-none"
        />
      </div>

      {users.length > 0 && searchKey && (
        <ul className="absolute left-0 right-0 bg-white border mt-1 max-h-48 overflow-auto z-10">
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => handleUserSelect(user)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center "
            >
              <div>
                {isBrokenImage ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-6 h-6 rounded-full mr-2"
                    onError={() => {
                      setIsBrokenImage(true);
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full mr-2 bg-blue-500 items-center flex justify-center ">
                    <span className="text-white text-xs uppercase">
                      {user.firstname[0] + user.lastname[0]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium capitalize">
                  {user.firstname + " " + user.lastname}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
