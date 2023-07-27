import React, { useState } from "react";
import { Container, Grow, Paper, createTheme } from "@mui/material";
import { useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
// import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const theme = createTheme();
  const [currentId, setCurrentId] = useState(0);

  // const { isLoading } = useSelector((state) => state.allPosts);

  return (
    <Grow in>
      <Container
        maxWidth="fixed"
        sx={{
          marginTop: { xs: "6rem", md: "2rem", sm: "5rem", lg: "3rem" },
          [theme.breakpoints.down("xs")]: {
            flexDirection: "column-reverse",
          },
        }}
      >
        <div>
          <div>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
          <div>
            <Posts setCurrentId={setCurrentId} />
          </div>

          <div>
            {!searchQuery && (
              <Paper
                sx={{
                  backgroundColor: "white",
                  // [theme.breakpoints.up("sm")]: {
                  //   display: "none",
                  // },
                }}
                elevation={6}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
