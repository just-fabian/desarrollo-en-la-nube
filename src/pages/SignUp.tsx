import { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { PageRoutes } from "../utils/pageRoutes";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(PageRoutes.PROFILE);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleProviderSignup = async (provider: "google" | "facebook") => {
    try {
      await signInWithPopup(
        auth,
        provider === "google" ? googleProvider : facebookProvider
      );
      navigate(PageRoutes.PROFILE);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center">
        Sign Up
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
        <Button variant="contained" onClick={handleEmailSignup}>
          Sign Up
        </Button>
        <Divider>or</Divider>
        <Button
          variant="outlined"
          onClick={() => handleProviderSignup("google")}
        >
          Sign Up with Google
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleProviderSignup("facebook")}
        >
          Sign Up with Facebook
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <Typography variant="body2" align="center">
          Already have an account? <Link to={PageRoutes.LOGIN}>Log In</Link>
        </Typography>
      </Stack>
    </Container>
  );
}
