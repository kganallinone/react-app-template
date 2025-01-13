// UserService.ts
import { APIService } from "./APIService";
import { useAsyncFetch } from "../utils/useFetch";
import { API_ENDPOINTS } from "../config/endpointConfig";
import { APP_CONSTANTS } from "../config/config";

export class UserService extends APIService {
  private asyncFetch;

  constructor() {
    super();
    this.asyncFetch = useAsyncFetch();
  }

  async register(userData: any) {
    return this.asyncFetch.post(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.CREATE}`,
      {
        body: JSON.stringify(userData),
        headers: {
          [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
            APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
        },
      }
    );
  }

  async login(credentials: any) {
    const data: any = await this.asyncFetch.post(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.LOGIN}`,
      {
        body: JSON.stringify(credentials),
        headers: {
          [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
            APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
        },
      }
    );
    if (data?.token) {
      localStorage.setItem("auth", JSON.stringify({ token: data.token }));
    }
    return data;
  }

  async get(userId: string) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.GET.replace(
      ":id",
      userId
    )}${this.query}`;
    this.resetQuery();
    return this.asyncFetch.get(url);
  }

  async getAll(page: number = 1, limit: number = 10) {
    this.resetQuery();
    return this.asyncFetch.get(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.GET_ALL}${this.query}&page=${page}&limit=${limit}`
    );
  }

  async update(userId: string, userData: any) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.UPDATE.replace(
      ":id",
      userId
    )}`;
    return this.asyncFetch.put(url, {
      body: JSON.stringify(userData),
      headers: {
        [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
          APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
      },
    });
  }

  async delete(userId: string) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.REMOVE.replace(
      ":id",
      userId
    )}`;
    return this.asyncFetch.delete(url);
  }

  async search(query: string) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.SEARCH}${this.query}?search=${query}`;
    this.resetQuery();
    return this.asyncFetch.get(url, {
      headers: {
        [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
          APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
      },
    });
  }

  async currentUser() {
    return this.asyncFetch.get(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.CHECKLOGIN}`
    );
  }

  async logout() {
    const response = await this.asyncFetch.get(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.LOGOUT}`
    );

    return response;
  }
}
