import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { PageRoutes } from "../utils/pageRoutes";
import { Person } from "@mui/icons-material";

export default function Header() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate(PageRoutes.LOGIN);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to={PageRoutes.HOME}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          FabianApp
        </Typography>

        <Box>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to={PageRoutes.LOGIN}>
                Login
              </Button>
              <Button color="inherit" component={Link} to={PageRoutes.SIGNUP}>
                Sign Up
              </Button>
            </>
          ) : (
            <Box display="flex" alignItems="center">
              <NavLink to={PageRoutes.PROFILE}>
                <Box display="flex" alignItems="center">
                  <Person sx={{ mr: 1 }} />
                  <Typography variant="body1" component="span" sx={{ mr: 2 }}>
                    {userProfile?.name.split(" ")[0]}
                  </Typography>
                </Box>
              </NavLink>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
