import { Typography, Stack, Box, Card, CardContent } from "@mui/material";
import { MailOutline, LocationOn, Cake } from "@mui/icons-material";
import { UserProfile } from "../../utils/types";

interface UserDetailsProps {
  userProfile: UserProfile;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userProfile }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack spacing={3} sx={{ padding: 2 }}>
          <Typography variant="h4" fontWeight={700}>
            {userProfile.name}
          </Typography>

          <Box display="flex" alignItems="center">
            <MailOutline sx={{ mr: 1 }} />
            <Typography variant="body1" color="textSecondary">
              {userProfile.email}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <LocationOn sx={{ mr: 1 }} />
            <Typography variant="body1" color="textSecondary">
              {userProfile.address}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Cake sx={{ mr: 1 }} />
            <Typography variant="body1" color="textSecondary">
              {userProfile.birthDate?.toDate
                ? userProfile.birthDate.toDate().toLocaleDateString()
                : "N/A"}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Miembro desde:{" "}
              {new Date(userProfile.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
