import { TextField, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, SetStateAction } from "react";

interface Props {
  name: string;
  address: string;
  birthDate: Date | null;
  setName: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setBirthDate: Dispatch<SetStateAction<Date | null>>;
  includeEmailPassword?: boolean;
  email?: string;
  password?: string;
  setEmail?: Dispatch<SetStateAction<string>>;
  setPassword?: Dispatch<SetStateAction<string>>;
}

export default function SignupForm({
  name,
  address,
  birthDate,
  setName,
  setAddress,
  setBirthDate,
  includeEmailPassword = false,
  email = "",
  password = "",
  setEmail,
  setPassword,
}: Props) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
      />
      <DatePicker
        label="Birth Date"
        value={birthDate}
        onChange={setBirthDate}
        maxDate={new Date()}
      />
      {includeEmailPassword && (
        <>
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail?.(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword?.(e.target.value)}
            fullWidth
          />
        </>
      )}
    </Stack>
  );
}
