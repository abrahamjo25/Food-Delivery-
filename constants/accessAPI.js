export const API_URL = "http://abrahamjo-001-site1.anytempurl.com";
export class ApiService {
  constructor() {
    this.baseUrl = API_URL;
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint, body) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data) return data;
      else throw error;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint, body) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      throw error;
    }
  }
}

// const apiService = new ApiService("https://example.com/api");

// async function fetchData() {
//   try {
//     const data = await apiService.get("data");
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// async function createData() {
//   try {
//     const data = await apiService.post("data", { key: "value" });
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// async function updateData() {
//   try {
//     const data = await apiService.put("data/1", { key: "updatedValue" });
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// async function deleteData() {
//   try {
//     const success = await apiService.delete("data/1");
//     console.log(success);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// fetchData();
// createData();
// updateData();
// deleteData();
