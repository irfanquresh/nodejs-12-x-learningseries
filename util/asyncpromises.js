const axios = require("axios");

async function getUser(id) {
  let response = await axios.default.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

async function getUserPosts(id) {
  let response = await axios.default.get(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );
  return response.data;
}

async function getUserWithPosts(id) {
  let currentUser = await getUser(id);
  let posts = await getUserPosts(id);
  currentUser.posts = posts;
  return currentUser;
}

(async () => {
  try {
    let user = await getUserWithPosts(1);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
})();
