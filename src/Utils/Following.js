export function following(allUsers, creator) {
  const matchingIds = [];
  allUsers.forEach((user) => {
    if (user?.followers.includes(creator)) {
      matchingIds.push(user._id);
    }
  });

  return matchingIds;
}
// export const following = (allUsers, creator) => {
//   const matchingIds = [];
//   for (const user of allUsers) {
//     if (user?.followers.includes(creator)) {
//       matchingIds.push(user._id);
//     }
//   }
//   return matchingIds;
// };
