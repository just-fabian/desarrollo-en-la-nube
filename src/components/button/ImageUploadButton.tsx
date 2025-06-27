import React from "react";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

interface ImageUploadButtonProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  handleImageChange,
}) => {
  return (
    <Button
      variant="outlined"
      component="label"
      sx={{
        width: "100%",
        padding: "10px 20px",
        backgroundColor: "#f3f4f6",
        color: "gray",
        borderColor: "#ccc",
        "&:hover": {
          backgroundColor: "#e2e8f0",
        },
      }}
    >
      <CloudUpload sx={{ mr: 2 }} />
      Upload Image
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </Button>
  );
};

export default ImageUploadButton;
