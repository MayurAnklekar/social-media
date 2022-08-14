import axiosConfig from "./axiosConfig";

const loginService = async (formData = {}) => {
  const params = { "email": formData.email, "password": formData.password };
  const { data } = await axiosConfig.post("/auth/login", params);
  return data;
};

const registerService = async (formData = {}) => {
  console.log("hello");
  const params = {
    "email": formData.email,
    "password": formData.password,
    "name": formData.name,
    "dob": formData.dob,
  };
  const { data } = await axiosConfig.post("/auth/register", params);
  console.log(data);
  return data;
};

export { loginService, registerService };
