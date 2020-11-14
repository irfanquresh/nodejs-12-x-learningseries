"use strict";

var axios = require("axios");

function getUser(id) {
  return axios["default"].get("https://jsonplaceholder.typicode.com/users/".concat(id)).then(function (response) {
    return response.data;
  });
}

function getUserPosts(id) {
  return axios["default"].get("https://jsonplaceholder.typicode.com/users/".concat(id, "/posts")).then(function (response) {
    return response.data;
  });
}

function getUserWithPosts(id) {
  var currentUser;
  return getUser(id).then(function (user) {
    currentUser = user;
    return getUserPosts(id);
  }).then(function (posts) {
    currentUser.posts = posts;
    return currentUser;
  });
}

getUserWithPosts(1).then(function (user) {
  console.log(user);
}, function (err) {
  console.log(err);
});