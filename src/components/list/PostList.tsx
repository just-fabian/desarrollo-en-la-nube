import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  where,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Box, CircularProgress, Button, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import PostCard from "../card/PostCard";
import { db } from "../../services/firebaseConfig";
import { Post } from "../../utils/types";

interface PostListProps {
  uid: string | null;
}

const PostList: React.FC<PostListProps> = ({ uid }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [noPosts, setNoPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { user } = useAuth();

  const fetchPosts = () => {
    try {
      setPosts([]);
      const postsRef = collection(db, "posts");
      let q = query(postsRef, orderBy("createdAt", "desc"), limit(5));

      if (uid) {
        q = query(q, where("uid", "==", uid));
      } else if(user?.uid) {
        q = query(q, where("uid", "!=", user?.uid));
      }

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        if (newPosts.length === 0) {
          setNoPosts(true);
        } else {
          setPosts(newPosts);
          setNoPosts(false);
        }

        setLoading(false);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

        if (newPosts.length < 5) {
          setHasMorePosts(false);
        }
      });

      return unsubscribe;
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
      throw err;
    }
  };

  const loadMore = () => {
    if (!lastVisible) return;
    setLoading(true);

    const postsRef = collection(db, "posts");
    let q = query(
      postsRef,
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(5)
    );

    if (uid) {
      q = query(q, where("uid", "==", uid));
    } else {
      q = query(q, where("uid", "!=", user?.uid));
    }

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts((prev) => [...prev, ...newPosts]);
      setLoading(false);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      if (newPosts.length < 5) {
        setHasMorePosts(false);
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchPosts();
    return () => unsubscribe();
  }, [uid, user?.uid]);

  return (
    <div>
      {noPosts && !loading && (
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No hay publicaciones para mostrar
        </Typography>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} isOwnProfile={uid === user?.uid} />
      ))}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !noPosts && hasMorePosts && (
        <Button onClick={loadMore} variant="outlined" fullWidth sx={{ mt: 3 }}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default PostList;
