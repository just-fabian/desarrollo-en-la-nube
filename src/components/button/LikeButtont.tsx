import { useState, useEffect } from "react";
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
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
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
  const [likeDocId, setLikeDocId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!userProfile) return;

      const q = query(
        collection(db, "likes"),
        where("postId", "==", postId),
        where("fromUid", "==", userProfile.uid),
        where("action", "==", "like")
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLiked(true);
        setLikeDocId(querySnapshot.docs[0].id);
      } else {
        setLiked(false);
        setLikeDocId(null);
      }
    };

    checkIfLiked();
  }, [postId, userProfile]);

  const handleLikeToggle = async () => {
    if (!userProfile) {
      setOpenDialog(true);
      return;
    }

    try {
      if (liked && likeDocId) {
        await deleteDoc(doc(db, "likes", likeDocId));
        setLiked(false);
        setLikeDocId(null);
      } else {
        const newLikeRef = await addDoc(collection(db, "likes"), {
          postId,
          fromUid: userProfile.uid,
          toUid: postOwnerId,
          action: "like",
          createdAt: serverTimestamp(),
        });
        setLiked(true);
        setLikeDocId(newLikeRef.id);
      }
    } catch (error) {
      console.error("Error toggling like: ", error);
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
        onClick={handleLikeToggle}
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
