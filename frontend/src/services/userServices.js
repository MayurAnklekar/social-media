import axiosConfig from "./axiosConfig";

const fetchUsersService = async (formData = {}) => {
	const params = { "id":formData.id, "query":formData.query };
	const { data } = await axiosConfig.get("/users", { params });
	return data;
};

const fetchFollowService = async (formData = {}) => {
	const { params } = { "id":formData.id };
	const { data } = await axiosConfig.patch("/users/follow/"+formData.profile_id, { params });
	return data;
}


export { fetchUsersService, fetchFollowService };
