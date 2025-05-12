import axios from "axios";

async function RegisterCustomer(data) {
  return axios.post("http://localhost:8080/customer", data)
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

export default RegisterCustomer;