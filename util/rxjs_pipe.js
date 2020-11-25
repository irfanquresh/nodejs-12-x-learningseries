const { interval, from } = require("rxjs");
const { map, filter, buffer, flatMap, concatMap } = require("rxjs/operators");
const axios = require("axios");

fetchUserName = (id) => {
  return from(
    axios.default.get(`https://jsonplaceholder.typicode.com/users/${id}`)
  ).pipe(
    map((response) => response.data),
    map((user) => user.name)
  );
};

from(
  axios.default
    .get(`https://jsonplaceholder.typicode.com/posts`)
    .then((response) => response.data)
)
  .pipe(
    flatMap((p) => p),
    concatMap(
      (post) => fetchUserName(post.userId),
      (post, userName) => {
        post.userName = userName;
        return post;
      }
    )
  )
  .subscribe((posts) => {
    console.log("posts: ", posts);
  });
