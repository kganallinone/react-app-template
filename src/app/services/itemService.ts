import { APIService } from "./APIService";
import { useAsyncFetch } from "../utils/useFetch";
import { API_ENDPOINTS } from "../config/endpointConfig";
import { APP_CONSTANTS } from "../config/config";
import { Item as Model } from "../models/itemModels";

export class ItemService extends APIService {
  private asyncFetch;

  constructor() {
    super();
    this.asyncFetch = useAsyncFetch();
  }

  async create(data: Model) {
    return this.asyncFetch.post(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.CREATE}`,
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
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET.replace(
      ":id",
      id
    )}${this.query}`;

    console.log(url);
    this.resetQuery();
    return this.asyncFetch.get(url);
  }

  async getAll(page: number = 1, limit: number = 10) {
    this.resetQuery();
    return this.asyncFetch.get(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.USER.GET_ALL}${this.query}&page=${page}&limit=${limit}`
    );
  }

  async getAllByProject(
    projectId: string,
    page: number = 1,
    limit: number = 10
  ) {
    this.resetQuery();
    return this.asyncFetch.get(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.GET_BY_PROJECT_ID.replace(
        ":projectId",
        projectId
      )}${this.query}&page=${page}&limit=${limit}`
    );
  }

  async update(data: Model) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.UPDATE}`;
    return this.asyncFetch.put(url, {
      body: JSON.stringify(data),
      headers: {
        [APP_CONSTANTS.HEADER.KEY.CONTENT_TYPE]:
          APP_CONSTANTS.HEADER.VALUE.APPLICATION_JSON,
      },
    });
  }

  async delete(id: string) {
    const url = `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.REMOVE.replace(
      ":id",
      id
    )}`;
    return this.asyncFetch.delete(url);
  }

  async search(params: any) {
    this.resetQuery();

    const body = this.buildSearchBody(
      params.query as any,
      params.populate as string[],
      params.sort as string,
      params.page as number,
      params.select as string[],
      params.limit as number,
      params.lean as boolean
    );

    return this.asyncFetch.post(
      `${API_ENDPOINTS.BASEURL}${API_ENDPOINTS.ITEM.SEARCH}`,
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
