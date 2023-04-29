class ApiService {
  url = null;
  constructor(serviceName) {
    this.url = `http://localhost:3001/api/v1/${serviceName}/`;
  }

  async getList() {
    const res = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    return response;
  }

  async getDetail(id) {
    const res = await fetch(`${this.url}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    return response;
  }

  async add(requestModel) {
    const res = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestModel),
    });
    const response = await res.json();
    return response;
  }

  async update(requestModel, id) {
    const res = await fetch(`${this.url}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestModel),
    });
    const response = await res.json();
    return response;
  }

  async delete(id) {
    await fetch(`${this.url}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await res.json();
    // return response;
  }
}

export default ApiService;
