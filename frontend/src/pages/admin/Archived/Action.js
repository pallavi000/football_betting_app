import axios from "axios";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export async function getArchivedCard() {
  try {
    const response = await axios.get("/card/archived/get", config);
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
}
