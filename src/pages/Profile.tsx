import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  Stack,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user, userProfile, loading } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8 }}>
        <Typography variant="h6">Cargando perfil...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardHeader
          title="Perfil de Usuario"
          sx={{ textAlign: "center", backgroundColor: "#f5f5f5" }}
        />
        <CardContent>
          {user && userProfile && (
            <Stack spacing={2}>
              <Typography>
                <Typography fontWeight={600}>Nombre: </Typography>{" "}
                {userProfile.name}
              </Typography>
              <Typography>
                <Typography fontWeight={600}>Correo: </Typography>{" "}
                {userProfile.email}
              </Typography>
              <Typography>
                <Typography fontWeight={600}>Dirección: </Typography>{" "}
                {userProfile.address}
              </Typography>
              <Typography>
                <Typography fontWeight={600}>Fecha de Nacimiento: </Typography>
                {userProfile.birthDate?.toDate
                  ? userProfile.birthDate.toDate().toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography>
                <Typography fontWeight={600}>Miembro desde: </Typography>
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
                sx={{ mt: 2, alignSelf: "flex-start" }}
              >
                Cerrar sesión
              </Button>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
