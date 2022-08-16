import Compress from "compress.js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const compress = new Compress();

  return <div>ImageUpload</div>;
}

export default ImageUpload;
