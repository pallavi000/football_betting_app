import axios from "axios";
import * as Toastr from "toastr";
import "../../../../node_modules/toastr/build/toastr.css";

const token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export async function getAllUsers() {
  try {
    const response = await axios.get("/user", config);
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

export async function UpdateProfileByAdmin(id, data) {
  try {
    const response = await axios.put(
      "/user/update/by-admin/" + id,
      data,
      config
    );
    console.log(response.data);
    Toastr.success("User Updated");
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    Toastr.error(error?.response?.data?.message ?? "Internal Server Error.");
    return {
      status: "error",
      message: error.message,
    };
  }
}

export async function PasswordUpdateByAdmin(id, data) {
  try {
    const response = await axios.put(
      "/user/update/password/by-admin/" + id,
      data,
      config
    );
    console.log(response.data);
    Toastr.success("User Updated");
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    Toastr.error(error?.response?.data?.message ?? "Internal Server Error.");
    return {
      status: "error",
      message: error.message,
    };
  }
}
