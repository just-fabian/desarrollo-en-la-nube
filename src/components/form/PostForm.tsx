import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { storage, db } from "../../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import ImageUploadButton from "../button/ImageUploadButton";

const PostForm = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImageUrl = null;

      if (image) {
        const storageRef = ref(
          storage,
          `posts/${user?.uid}/${Date.now()}_${image.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, image);

        await uploadTask;

        uploadedImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
      }

      await addDoc(collection(db, "posts"), {
        uid: user?.uid,
        content,
        createdAt: new Date(),
        imageUrl: uploadedImageUrl || null,
      });

      setContent("");
      setImage(null);
      setImagePreview(null);
      setLoading(false);
    } catch (error) {
      console.error("Error creating post: ", error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <ImageUploadButton handleImageChange={handleImageChange} />

        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            alt="Selected Image Preview"
            sx={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              marginTop: 2,
            }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 16 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Post"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostForm;
