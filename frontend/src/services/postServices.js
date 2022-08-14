import axiosConfig from "./axiosConfig";

const createPostService = async (formData = {}) => {
	const headers = { "Content-Type": "multipart/form-data" };
	const { data } = await axiosConfig.post("/posts", formData, { headers });
	return data;
};

const fetchPostsService = async (formData = {}) => {
	const params = {"id":formData.id, "query":formData.query, "page":formData.page, "userId":formData.userId};
	const { data } = await axiosConfig.get("/posts", { params });
	return data;
};

const deletePostService = async (formData = {}) => {
	const { id } = formData;
	const { data } = await axiosConfig.delete(`/posts/${id}`);
	return data;
};

const likePostService = async (formData = {}) => {
	const params = {"id":formData.id, "add":formData.add}
	const { data } = await axiosConfig.patch("/posts/like", params);
	return data;
};

const commentPostService = async (formData = {}) => {
	const params = {"id":formData.id, "comment":formData.comment};
	const { data } = await axiosConfig.patch("/posts/comment", params);
	return data;
};


export {
	fetchPostsService,
	createPostService,
	deletePostService,
	likePostService,
	commentPostService
};
