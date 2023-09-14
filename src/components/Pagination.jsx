/* eslint-disable react/jsx-props-no-spreading */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.timeline);

  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "space-evenly" }}
      count={numberOfPages}
      page={Number(page) || 1}
      color="secondary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
