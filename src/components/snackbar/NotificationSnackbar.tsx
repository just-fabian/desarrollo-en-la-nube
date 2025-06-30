import { SyntheticEvent, useEffect, useState } from "react";
import { Snackbar, Alert, SnackbarCloseReason } from "@mui/material";
import { onMessageListener } from "../../services/fcmService";

export default function NotificationSnackbar() {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<{
    title: string;
    body: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onMessageListener((payload) => {
      const title = payload.notification?.title || "Notification";
      const body = payload.notification?.body || "";
      setMessageInfo({ title, body });
      setOpen(true);
    });

    return () => unsubscribe();
  }, []);

  const handleClose = (
    _event?: Event | SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
        <strong>{messageInfo?.title}</strong>: {messageInfo?.body}
      </Alert>
    </Snackbar>
  );
}
