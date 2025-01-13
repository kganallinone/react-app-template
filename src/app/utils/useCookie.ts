export const useCookie = () => {
  const setCookie = (name: string, value: string, days?: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/; Secure; HttpOnly`;
    // document.cookie = `${name}=${value}${expires}; path=/; Secure`;
  };

  const getCookie = (name: string): string | undefined => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      let c = cookie.trim(); // Remove leading spaces
      if (c.startsWith(nameEQ)) {
        return c.substring(nameEQ.length); // Return the cookie value
      }
    }

    return undefined; // Return undefined if not found
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; HttpOnly`;
  };

  return { setCookie, getCookie, deleteCookie };
};
