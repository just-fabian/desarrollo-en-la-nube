import { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../services/firebaseConfig";
import { Link } from "react-router-dom";
import { PageRoutes } from "../utils/pageRoutes";
import { useNavigate } from "react-router-dom";
import { saveFcmTokenForUser } from "../services/fcmService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await saveFcmTokenForUser(response.user.uid);
      navigate(PageRoutes.PROFILE);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleProviderLogin = async (provider: "google" | "facebook") => {
    try {
      const response = await signInWithPopup(
        auth,
        provider === "google" ? googleProvider : facebookProvider
      );
      await saveFcmTokenForUser(response.user.uid);
      navigate(PageRoutes.PROFILE);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Login
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleEmailLogin}>
          Login
        </Button>
        <Divider>or</Divider>
        <Button
          variant="outlined"
          onClick={() => handleProviderLogin("google")}
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleProviderLogin("facebook")}
        >
          Continue with Facebook
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <Typography variant="body2" align="center">
          Don’t have an account? <Link to={PageRoutes.SIGNUP}>Sign Up</Link>
        </Typography>
      </Stack>
    </Container>
  );
}
