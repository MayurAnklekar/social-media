import axiosConfig from "./axiosConfig";

const fetchUsersService = async (formData = {}) => {
	const params = { "id":formData.id, "query":formData.query };
	const { data } = await axiosConfig.get("/users", { params });
	return data;
};


export { fetchUsersService };
