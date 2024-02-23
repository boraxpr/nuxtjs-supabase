class APIFacade {
  base_url = "http://localhost:8080"; // Hardcoded base URL
  // TESTED
  get = async (endpoint: string): Promise<JSON | null> => {
    const response = await fetch(`${this.base_url}/${endpoint}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Response Failed");
      return null;
    }
    return await response.json();
  };
  // TESTED
  session = async (): Promise<boolean> => {
    const response = await fetch(`${this.base_url}/session`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log("Response Failed");
      return false;
    }
    return true;
  };
  // TESTED : Might be better to useAsyncData Directly from the pages
  getWithCache = async (endpoint: string): Promise<{ data: Ref<JSON | null>, pending: Ref<boolean>, error: Ref<Error | null> }> => {
    const { data, pending, error } = await useAsyncData(endpoint, () => this.get(endpoint), {
      server: false,
    });
    return { data: data, pending: pending, error: error };
  };

  create = async <T>(endpoint: string, body: T): Promise<JSON> => {
    const response = await fetch(`${this.base_url}/${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  login = async (credential: { email: string, password: string, }): Promise<Boolean> => {
    const response = await fetch(`${this.base_url}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) {
      return false
    } else {
      console.log("SUCCESS LOGIN");
      return true
    }
  };

  update = async <T>(endpoint: string, body: T): Promise<JSON> => {
    const response = await fetch(`${this.base_url}/${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };
}

export function useAPI() {
  const api = new APIFacade(); // No need to pass base URL

  return {
    get: api.get,
    create: api.create,
    login: api.login,
    getWithCache: api.getWithCache,
    session: api.session,
  };
}
