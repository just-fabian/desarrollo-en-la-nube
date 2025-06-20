import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConfig";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePostSubmit = async () => {
    if (content.trim().length === 0) {
      setError("Post cannot be empty");
      return;
    }

    try {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        uid: auth.currentUser?.uid,
        content,
        createdAt: serverTimestamp(),
      });

      setContent("");
      setError(null);
    } catch (err) {
      setError("Error posting your message");
      console.error(err);
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="What's on your mind?"
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
      <Button variant="contained" onClick={handlePostSubmit}>
        Post
      </Button>
    </Stack>
  );
};

export default PostForm;
