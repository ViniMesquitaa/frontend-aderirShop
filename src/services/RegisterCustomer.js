import { Axios } from "axios";

async function registerCustomer(data) {
  return Axios.post("/customer", data)
    .then((response) => {
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Failed to register customer");
      }
    })
    .catch((error) => {
      console.error("Error registering customer:", error);
      throw error;
    });
}

export default registerCustomer;