import { useState } from "react";
import { upload } from "../api/Api";

export const useImageUpload = (onSuccess) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const formData = new FormData();
    formData.append("file-to-upload", file);

    setIsUploading(true);
    try {
      const res = await upload(formData);
      const remoteUrl = res.data.imageUrl;

      if (onSuccess) onSuccess(remoteUrl);
      return remoteUrl;
    } catch {
      alert("圖片上傳失敗");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    previewUrl,
    handleFileChange,
    setPreviewUrl,
  };
};
