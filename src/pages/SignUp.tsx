import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../services/firebaseConfig";
import { PageRoutes } from "../utils/pageRoutes";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/form/SignUpForm";
import { saveUserProfile, UserProfile } from "../services/saveUserProfile";
import { Timestamp } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [providerToUse, setProviderToUse] = useState<
    "google" | "facebook" | null
  >(null);

  const resetFields = () => {
    setName("");
    setAddress("");
    setBirthDate(null);
    setEmail("");
    setPassword("");
  };

  const createProfile = async (uid: string, email: string) => {
    if (!birthDate) throw new Error("Birth date is required");
    const profile: UserProfile = {
      uid,
      name,
      address,
      birthDate: Timestamp.fromDate(birthDate),
      email,
      createdAt: Date.now(),
    };
    await saveUserProfile(profile);
  };

  const handleEmailSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createProfile(userCredential.user.uid, email);
      navigate(PageRoutes.PROFILE);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleProviderModalOpen = (provider: "google" | "facebook") => {
    setProviderToUse(provider);
    setOpenModal(true);
  };

  const handleProviderSignup = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        providerToUse === "google" ? googleProvider : facebookProvider
      );

      const user = result.user;
      if (email && password) {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);
      }

      await createProfile(user.uid, user.email ?? "");
      navigate(PageRoutes.PROFILE);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setOpenModal(false);
      resetFields();
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <SignupForm
        name={name}
        address={address}
        birthDate={birthDate}
        setName={setName}
        setAddress={setAddress}
        setBirthDate={setBirthDate}
        includeEmailPassword
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleEmailSignup}
      >
        Sign Up
      </Button>
      <Divider sx={{ my: 2 }}>or</Divider>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => handleProviderModalOpen("google")}
        sx={{ mb: 2 }}
      >
        Sign Up with Google
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => handleProviderModalOpen("facebook")}
      >
        Sign Up with Facebook
      </Button>
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
      <Typography variant="body2" align="center" mt={2}>
        Already have an account? <Link to={PageRoutes.LOGIN}>Log In</Link>
      </Typography>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Complete your profile</DialogTitle>
        <DialogContent>
          <SignupForm
            name={name}
            address={address}
            birthDate={birthDate}
            setName={setName}
            setAddress={setAddress}
            setBirthDate={setBirthDate}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleProviderSignup}
          >
            Continue with {providerToUse}
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
