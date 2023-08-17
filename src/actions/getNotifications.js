const loggedInUser = JSON.parse(localStorage.getItem("profile"));

export const extractOtherUserComments = (allPosts) => {
  let filteredComments = [];
  for (const post of allPosts) {
    if (post?.creator === loggedInUser?.result._id) {
      const postComments = nextedComments(post?.comments);

      filteredComments = filteredComments.concat(postComments).flat();
    }
  }

  return filteredComments;
};

const nextedComments = (comments) => {
  let newComments = [];

  if (!comments) {
    return newComments;
  }

  for (const comment of comments) {
    if (comment.userId !== loggedInUser?.result._id) {
      newComments.push(comment);
    }

    const nested = nextedComments(comment.comments);
    newComments = newComments.concat(nested);
  }

  return newComments;
};
