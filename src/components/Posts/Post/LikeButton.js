import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useStateContext } from "../../../context/ContextProvider";

const LikeButton = ({ likes }) => {
  const { loggedInUser } = useStateContext();
  const userId = loggedInUser?.result?._id;

  if (likes.length > 0) {
    return likes.includes(userId) ? (
      <>
        <FavoriteIcon
          fontSize="small"
          sx={{
            color: "red",
            "&:hover": {
              opacity: "0.5",
            },
          }}
        />
        &nbsp;
        {likes.length >= 2 ? (
          <span style={{ fontSize: "0.8rem" }}>
            {`You and ${likes.length - 1} other${likes.length <= 2 ? "" : "s"}`}
          </span>
        ) : (
          `${likes.length} like${likes.length > 1 ? "s" : ""}`
        )}
      </>
    ) : (
      <>
        <FavoriteBorderIcon
          fontSize="small"
          sx={{
            "&:hover": {
              opacity: "0.5",
            },
          }}
        />
        &nbsp;{likes.length} {likes.length === 1 ? "" : ""}
      </>
    );
  }

  return (
    <FavoriteBorderIcon
      fontSize="small"
      sx={{
        color: "black",
        "&:hover": {
          opacity: "0.5",
        },
      }}
    />
  );
};

export default LikeButton;
