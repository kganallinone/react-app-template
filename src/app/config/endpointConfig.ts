const isLocalhost = location.hostname === "localhost";
const isDevEnvironment = location.hostname.includes("dev");
const isTestEnvironment = location.hostname.includes("test");

export const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : isDevEnvironment
  ? "https://sample-api-dev-e9953c1dd9d9.herokuapp.com"
  : isTestEnvironment
  ? "https://sample-api-dev-e9953c1dd9d9.herokuapp.com"
  : "https://sample-api-dev-e9953c1dd9d9.herokuapp.com/api";

export const SOCKET_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://sample-api-dev-e9953c1dd9d9.herokuapp.com";

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  BASEURL: `${API_BASE_URL}/api`,

  USER: {
    GET_ALL: "/user/get/all",
    GET: "/user/get/:id",
    CREATE: "/user/create",
    UPDATE: "/user/update",
    REMOVE: "/user/remove/:id",
    LOGIN: "/user/login",
    LOGOUT: "/user/logout",
    CHECKLOGIN: "/current/user",
    SEARCH: "/user/search",
  },

  ITEM: {
    GET_ALL: "/board/get/all",
    GET: "/board/get/:id",
    POST: "/board/create",
    PUT: "/board/update",
    DELETE: "/board/remove/:id",
    SEARCH: "/board/search",
    ADD_COLUMN: "/board/addcolumn",
    EDIT_COLUMN: "/board/editcolumn",
    DELETE_COLUMN: "/board/deletecolumn/:boardid/:columnid",
    MOVE_STATUS: "/board/movestatus",
  },
};
