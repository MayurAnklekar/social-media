import React, { useEffect, useState } from "react";
import { sendIcon, fileIcon, closeIcon } from "../../assets";
import { useDispatch } from "react-redux";
import { addPost } from "../../features/postSlice";
import Compress from "compress.js";
import "./createpost.css";

const initialForm = { image: null, preview: null, caption: "" };

const CreatePost = () => {
    const [form, setForm] = useState(initialForm);

    const compress = new Compress();
    const dispatch = useDispatch();

	const compressImage = async files => {
		const options = { size: 1, quality: 0.75, maxWidth: 1920, maxHeight: 1920, resize: true, rotate: false };
		const data = await compress.compress(files, options);
		return data;
	};


    const loadImage = async (e) => {
        const input = e.target;
        console.log(e.target);
        if (!input) return;
        var reader = new FileReader();
        reader.onload = function (e) {
			setForm(form => ({ ...form, preview: e.target.result }));
		};
        input.files[0] && reader.readAsDataURL(input.files[0]);
		const files = [...input.files];
        const data = await compressImage(files);
        const image = Compress.convertBase64ToFile(data[0]?.data, data[0]?.ext);
        setForm(form => ({ ...form, image }));
    }

    const submitHandler = async(e) => {
        e.preventDefault();
		const formData = new FormData();
        console.log(formData)
        formData.append("caption", form.caption.trim());
        formData.append("image", form.image);
        console.log(formData)
        dispatch(addPost({ formData }));
        setForm(initialForm);
    }

    return (
        <article className="createpost gradient-border">
			<form onSubmit={submitHandler}>
				<textarea
					placeholder="What's on your mind?"
					value={form.caption}
					onChange={e => setForm({ ...form, caption: e.target.value })}
				/>
				{form.preview && (
					<div className="uploaded-image">
						<img src={form.preview} alt="uploaded file" />
						<div className="close-icon" onClick={() => setForm({ ...form, image: null, preview: null })}>
							<img src={closeIcon} alt="remove" />
						</div>
					</div>
				)}
				<div className="btns">
					<label htmlFor="image" aria-label="select file">
						<div>
							<img src={fileIcon} alt="select file" />
						</div>
					</label>
					<input type="file" id="image" accept="image/png, image/jpeg" onChange={loadImage} />
					<button type="submit" aria-label="submit">
						<img src={sendIcon} alt="send" />
					</button>
				</div>
			</form>
		</article>
    );
};

export default CreatePost;
