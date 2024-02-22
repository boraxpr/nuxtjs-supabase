class APIFacade {
  base_url = "http://localhost:8080"; // Hardcoded base URL
  // TESTED
  get = async (endpoint) => {
    const response = await fetch(`${this.base_url}/${endpoint}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Response Failed");
      return;
    }
    const data = await response.json();
    return data;
  };
  // TESTED
  session = async () => {
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
  // TESTED
  getWithCache = async (endpoint) => {
    const { data } = await useAsyncData(endpoint, () => this.get(endpoint), {
      server: false,
    });
    return data;
  };

  create = async (endpoint, body) => {
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

  login = async (credential) => {
    const response = await fetch(`${this.base_url}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      console.log("SUCCESS LOGIN");
    }
  };

  update = async (endpoint, body) => {
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
