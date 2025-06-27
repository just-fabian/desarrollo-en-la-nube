import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { Person, MoreHoriz } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { PageRoutes } from "../../utils/pageRoutes";
import { Post, UserProfile } from "../../utils/types";

interface PostCardProps {
  post: Post;
  isOwnProfile: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isOwnProfile }) => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "users", post.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserProfile;
          setUserInfo(userData);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, [post.uid]);

  return (
    <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <Person />
          </Avatar>
          <Typography variant="subtitle1" fontWeight={600}>
            {userInfo?.name ?? ""}
          </Typography>
          {!isOwnProfile && (
            <IconButton
              sx={{ marginLeft: "auto" }}
              onClick={() => navigate(`${PageRoutes.PROFILE}/${post.uid}`)}
            >
              <MoreHoriz />
            </IconButton>
          )}
        </Stack>

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 400 }}>
          {post.content}
        </Typography>

        {post.imageUrl && (
          <Box
            component="img"
            src={post.imageUrl}
            alt="Post image"
            sx={{ width: "100%", height: "auto", mt: 2 }}
          />
        )}

        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ display: "block", marginTop: 1 }}
        >
          {new Date(post.createdAt?.seconds * 1000).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
