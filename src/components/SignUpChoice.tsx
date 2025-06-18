import { Button, Stack, Typography } from "@mui/material";

interface Props {
  onSelect: (method: "email" | "google" | "facebook") => void;
}

export default function SignupChoice({ onSelect }: Props) {
  return (
    <Stack spacing={2} alignItems="center" mt={4}>
      <Typography variant="h5">Elige un método de registro</Typography>
      <Button variant="contained" fullWidth onClick={() => onSelect("email")}>
        Continuar con correo
      </Button>
      <Button variant="outlined" fullWidth onClick={() => onSelect("google")}>
        Continuar con Google
      </Button>
      <Button variant="outlined" fullWidth onClick={() => onSelect("facebook")}>
        Continuar con Facebook
      </Button>
    </Stack>
  );
}
