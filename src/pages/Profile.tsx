import { Button, Container, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to your profile!
      </Typography>
      {user && (
        <>
          <Typography>Email: {user.email}</Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Profile;
