import { APIService } from "./APIService";
import { useAsyncFetch } from "../utils/useFetch";
import { API_ENDPOINTS } from "../config/endpointConfig";
import { APP_CONSTANTS } from "../config/config";

export class StatusService extends APIService {
  private asyncFetch;

  constructor() {
    super();
    this.asyncFetch = useAsyncFetch();
  }

  async create(data: any) {
    return this.asyncFetch.post(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.STATUS.CREATE}`,
      {
        body: JSON.stringify(data),
        headers: {
          [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
            APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
        },
      }
    );
  }

  async get(id: string) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.STATUS.GET.replace(
      ":id",
      id
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

  async update(id: string, data: any) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.STATUS.UPDATE.replace(
      ":id",
      id
    )}`;
    return this.asyncFetch.put(url, {
      body: JSON.stringify(data),
      headers: {
        [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
          APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
      },
    });
  }

  async delete(id: string) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.STATUS.REMOVE.replace(
      ":id",
      id
    )}`;
    return this.asyncFetch.delete(url);
  }

  async search(
    query: any = {},
    select: string[] = [],
    populate: string[] = [],
    limit: number = 10,
    page: number = 1,
    sort: string = "-createdAt",
    lean: boolean = false
  ) {
    this.resetQuery();

    const body = this.buildSearchBody(
      query,
      populate,
      sort,
      page,
      select,
      limit,
      lean
    );

    return this.asyncFetch.post(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.STATUS.SEARCH}`,
      {
        body: JSON.stringify(body),
        headers: {
          [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
            APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
        },
      }
    );
  }
}
