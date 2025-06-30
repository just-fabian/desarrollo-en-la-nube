import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect } from "react";
import { onMessageListener } from "./services/fcmService";
import NotificationSnackbar from "./components/snackbar/NotificationSnackbar";

function App() {
  useEffect(() => {
    onMessageListener((payload) => {
      alert(`${payload.notification.title} - ${payload.notification.body}`);
    });
  }, []);

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <NotificationSnackbar />
        <AppRouter />
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
