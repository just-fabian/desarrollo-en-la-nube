import { useEffect, useState } from "react";
import {
  IconButton,
  Badge,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../services/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const NotificationIcon = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchNotifications = () => {
      if (!user) return;

      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid),
        where("isRead", "==", false),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notificationsData = querySnapshot.docs.map((doc) => doc.data());
        setNotifications(notificationsData);
        setUnreadCount(notificationsData.length);
      });

      return unsubscribe;
    };

    fetchNotifications();
  }, [user]);

  const handleNotificationClick = () => {
    setOpenModal(true);
    setUnreadCount(0)
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <IconButton onClick={handleNotificationClick} style={{ color: "#fff" }}>
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notifications
          </Typography>
          {notifications.length === 0 ? (
            <Typography>No new notifications</Typography>
          ) : (
            <List>
              {notifications.map((notification, index) => (
                <ListItem key={index}>
                  <ListItemText primary={notification.message} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default NotificationIcon;
