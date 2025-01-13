export class APIService {
  query: string;

  constructor() {
    this.query = "";
  }

  // Private method to append to query
  #appendToQuery(query: string) {
    if (this.query === "") {
      this.query = `?${query}`;
    } else {
      this.query += `&${query}`;
    }
  }

  buildSearchBody(
    queryKey: any,
    populateArray: string[],
    sort: string,
    skip: number,
    select: string[],
    limit: number,
    lean: boolean
  ) {
    return {
      query: queryKey,
      populateArray: populateArray,
      sort: sort,
      skip: skip,
      select: select.join(" "),
      limit: limit,
      lean: lean,
    };
  }

  select(selectArray: string[]) {
    selectArray.forEach((select) => this.#appendToQuery(`select=${select}`));
    return this; // Return this for chaining
  }

  populate(populateArray: { path: string; select?: string }[]) {
    populateArray.forEach((populate, index) => {
      if ("path" in populate) {
        this.#appendToQuery(`populateArray[${index}][path]=${populate.path}`);
      }
      if ("select" in populate) {
        this.#appendToQuery(
          `populateArray[${index}][select]=${populate.select}`
        );
      }
    });
    return this; // Return this for chaining
  }

  sort(sort: string) {
    this.#appendToQuery(`sort=${sort}`);
    return this; // Return this for chaining
  }

  limit(limit: number) {
    this.#appendToQuery(`limit=${limit}`);
    return this; // Return this for chaining
  }

  page(page: number) {
    this.#appendToQuery(`page=${page}`);
    return this; // Return this for chaining
  }

  lean(lean: boolean) {
    this.#appendToQuery(`lean=${lean}`);
    return this; // Return this for chaining
  }

  find(queryKey: any) {
    this.#appendToQuery(`search=${queryKey}`);
    return this; // Return this for chaining
  }

  resetQuery() {
    this.query = ""; // Resets the query for future use
  }
}
