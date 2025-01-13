const isLocalhost = location.hostname === "localhost";
const isDevEnvironment = location.hostname.includes("dev");
const isTestEnvironment = location.hostname.includes("test");

export const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : isDevEnvironment
  ? "https://pisara-service-dev-e9953c1dd9d9.herokuapp.com"
  : isTestEnvironment
  ? "https://pisara-service-dev-e9953c1dd9d9.herokuapp.com"
  : "https://pisara-service-dev-e9953c1dd9d9.herokuapp.com/api";

export const SOCKET_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://pisara-service-dev-e9953c1dd9d9.herokuapp.com";

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

  BOARD: {
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

  PROJECT: {
    GET_ALL: "/project/get/all",
    GET: "/project/get/:id",
    GET_LATEST: "/project/get/latest",
    CREATE: "/project/create",
    UPDATE: "/project/update",
    REMOVE: "/project/remove/:id",
    SEARCH: "/project/search",
    ADD_MEMBER: "/project/addmember",
    UPDATE_MEMBER_PERMISSIONS: "/project/update/permissions",
    REMOVE_MEMBER: "/project/remove/member/:projectId/:userId",
    UPDATE_DETAILS: "/project/update/details",
    UPDATE_STATUS_NOTES: "/project/update/statusnotes",
  },

  ITEM: {
    GET_ALL: "/item/get/all",
    GET: "/item/get/:id",
    GET_BY_PROJECT_ID: "/item/get/project/:projectId",
    CREATE: "/item/create",
    UPDATE: "/item/update",
    REMOVE: "/item/remove/:id",
    SEARCH: "/item/search",
    SEARCH_ITEM: "/item/searchitem",
    ADD_COMMENT: "/item/:itemId/addcomment",
    DELETE_COMMENT: "/item/:itemId/removecomment",
    ADD_IMAGE: "/item/:itemId/addimage",
    GET_MY_ITEMS: "/item/get/myitems/:userId",
    MOVE_STATUS: "/item/movestatus",
    ADD_CHILD: "/item/addchild",
    REMOVE_CHILD: "/item/removechild",
    FILTER: "/item/filter",
  },

  ITEM_TYPE: {
    GET_ALL: "/itemtype/get/all",
    GET: "/itemtype/get/:id",
    CREATE: "/itemtype/create",
    UPDATE: "/itemtype/update",
    REMOVE: "/itemtype/remove/:id",
    SEARCH: "/itemtype/search",
    ADD_COMMENT: "/itemtype/:itemtypeId/addcomment",
    DELETE_COMMENT: "/itemtype/:itemtypeId/removecomment",
    GET_MY_ITEMS: "/itemtype/get/myitems/:userId",
  },

  WORKFLOW: {
    GET_ALL: "/workflow/get/all",
    GET: "/workflow/get/:id",
    CREATE: "/workflow/create",
    UPDATE: "/workflow/update",
    REMOVE: "/workflow/remove/:id",
    SEARCH: "/workflow/search",
  },

  FIELD: {
    GET_ALL: "/field/get/all",
    GET: "/field/get/:id",
    CREATE: "/field/create",
    UPDATE: "/field/update",
    REMOVE: "/field/remove/:id",
    SEARCH: "/field/search",
  },

  DASHBOARD: {
    GET_ALL: "/dashboard/get/all",
    GET_CURRENT_USER: "/dashboard/current-user",
    GET: "/dashboard/get/:id",
    GET_BY_PROJECT_ID: "/dashboard/get/project/:projectId",
    CREATE: "/dashboard/create",
    UPDATE: "/dashboard/update",
    REMOVE: "/dashboard/remove/:id",
    SEARCH: "/dashboard/search",
  },

  REPORT: {
    GET_ALL: "/report/get/all",
    GET_CURRENT_USER: "/report/current-user",
    GET: "/report/get/:id",
    GET_BY_PROJECT_ID: "/report/get/project/:projectId",
    CREATE: "/report/create",
    UPDATE: "/report/update",
    REMOVE: "/report/remove/:id",
    SEARCH: "/report/search",
    ITEM_COUNT_BY_STATUS: "/report/itemcount/status",
    ITEM_COUNT_BY_ASSIGNEE: "/report/itemcount/assignee",
    ITEM_COUNT_BY_ITEM_TYPE: "/report/itemcount/itemtype",
    ITEM_COUNT_BY_DATE: "/report/itemcount/date",
  },

  ORGANIZATION: {
    GET_ALL: "/organization/get/all",
    GET: "/organization/get/:id",
    GET_BY_PROJECT_ID: "/organization/get/project/:projectId",
    GET_ALL_BY_PROJECT_ID: "/organization/get/project/:projectId",
    CREATE: "/organization/create",
    UPDATE: "/organization/update",
    REMOVE: "/organization/remove/:id",
    ADD_PROJECT: "/organization/addproject",
    SEARCH: "/organization/search",
  },

  TEMPLATE: {
    GET_ALL: "/template/get/all",
    GET: "/template/get/:id",
    CREATE: "/template/create",
    UPDATE: "/template/update",
    REMOVE: "/template/remove/:id",
    SEARCH: "/template/search",
  },

  APP: {
    GET_ALL: "/app/get/all",
    GET: "/app/get/:id",
    CREATE: "/app/create",
    UPDATE: "/app/update",
    REMOVE: "/app/remove/:id",
    SEARCH: "/app/search",
  },

  ACTIVITY: {
    GET_ALL: "/activity/get/all",
    GET: "/activity/get/:id",
    CREATE: "/activity/create",
    UPDATE: "/activity/update",
    REMOVE: "/activity/remove/:id",
    SEARCH: "/activity/search",
  },

  STATUS: {
    GET_ALL: "/status/get/all",
    GET: "/status/get/:id",
    CREATE: "/status/create",
    UPDATE: "/status/update",
    REMOVE: "/status/remove/:id",
    SEARCH: "/status/search",
  },

  NOTIFICATION: {
    GET_ALL: "/notification/get/all",
    GET: "/notification/get/:id",
    CREATE: "/notification/create",
    UPDATE: "/notification/update",
    REMOVE: "/notification/remove/:id",
    SEARCH: "/notification/search",
  },
};
