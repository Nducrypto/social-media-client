import React, { useState } from "react";
import { Container, Grow, Paper, createTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import Display from "../Posts/Display";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import { postIsLoading } from "../../reducers/posts";
import { useSelector } from "react-redux";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const theme = createTheme();
  const [currentId, setCurrentId] = useState(0);
  const isLoading = useSelector(postIsLoading);

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
            <Display setCurrentId={setCurrentId} />
          </div>

          <div>
            {isLoading ? null : (
              <>
                {!searchQuery && (
                  <Paper
                    sx={{
                      backgroundColor: "white",
                    }}
                    elevation={6}
                  >
                    <Pagination page={page} />
                  </Paper>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </Grow>
  );
};

export default Home;
