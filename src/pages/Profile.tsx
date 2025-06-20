import { Button, Container, Stack, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import UserDetails from "../components/details/UserDetails";
import PostForm from "../components/form/PostForm";
import PostList from "../components/list/PostList";
import { PageRoutes } from "../utils/pageRoutes";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { UserProfile } from "../utils/types";

const Profile = () => {
  const { user, userProfile, loading } = useAuth();
  const { uid } = useParams<{ uid?: string }>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (uid && uid !== user?.uid) {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            console.log("User profile not found");
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      } else {
        setProfile(userProfile);
      }
    };

    fetchProfile();
  }, [uid, user, userProfile]);

  const handleLogout = () => {
    signOut(auth);
    navigate(PageRoutes.HOME);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography variant="h6">Cargando perfil...</Typography>
      </Container>
    );
  }

  const isOwnProfile = user?.uid === uid || !uid;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      {profile && (
        <Stack spacing={3}>
          <UserDetails userProfile={profile} />

          {isOwnProfile && <PostForm />}

          <PostList uid={uid || user?.uid || ""} />

          {isOwnProfile && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ mt: 2, mb: 4, alignSelf: "flex-start" }}
            >
              Cerrar sesión
            </Button>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default Profile;
