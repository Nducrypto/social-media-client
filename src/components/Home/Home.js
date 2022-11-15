import React, { useState } from "react";
import { Container, Grow, Grid, Paper, createTheme } from "@mui/material";
import {} from "react-redux";
import { useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const theme = createTheme();
  const [currentId, setCurrentId] = useState(0);

  const [tags] = useState([]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={1}
          sx={{
            marginTop: "6rem",
            [theme.breakpoints.down("xs")]: {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Grid item xs={12} sm={4} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item sm={9} lg={9}>
            {!searchQuery && !tags.length && (
              <Paper
                sx={{
                  borderRadius: 4,
                  padding: "16px",
                  color: "black",
                  marginLeft: "15rem",
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                }}
                elevation={6}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>

          <Grid item xs={12}>
            {!searchQuery && !tags.length && (
              <Paper
                sx={{
                  backgroundColor: "white",
                  [theme.breakpoints.up("sm")]: {
                    display: "none",
                  },
                }}
                elevation={6}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
