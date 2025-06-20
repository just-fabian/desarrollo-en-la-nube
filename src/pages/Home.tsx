import { Container, Typography } from "@mui/material";
import PostList from "../components/list/PostList";

const Home: React.FC = () => (
  <Container maxWidth="sm" sx={{ mt: 8 }}>
    <Typography variant="h4" gutterBottom>
      Posts
    </Typography>
    <PostList uid={null} />
  </Container>
);

export default Home;
