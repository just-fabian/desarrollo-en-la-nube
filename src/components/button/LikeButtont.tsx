import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { PageRoutes } from "../../utils/pageRoutes";
import { useNavigate } from "react-router-dom";

const LikeButton = ({
  postId,
  postOwnerId,
}: {
  postId: string;
  postOwnerId: string;
}) => {
  const { userProfile } = useAuth();
  const [liked, setLiked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleLike = async () => {
    if (!userProfile) {
      setOpenDialog(true);
      return;
    }

    try {
      if (!liked) {
        const message = `${userProfile.name} liked your post`;

        await addDoc(collection(db, "notifications"), {
          userId: postOwnerId,
          message,
          postId,
          isRead: false,
          createdAt: serverTimestamp(),
        });

        setLiked(true);
      } else {
        console.log("Already liked!");
      }
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  };

  const handleLogin = () => {
    navigate(PageRoutes.LOGIN);
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleLike}
        sx={{
          color: liked ? "blue" : "gray",
          "&:hover": {
            color: liked ? "darkblue" : "darkgray",
          },
        }}
      >
        <ThumbUp />
      </IconButton>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Log in to Like this Post</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You need to log in to like this post.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LikeButton;
