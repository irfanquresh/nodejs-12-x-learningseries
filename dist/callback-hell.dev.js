"use strict";

var request = require("request");

function getUser(id, callback) {
  request.get("https://jsonplaceholder.typicode.com/users/".concat(id), function (err, response) {
    if (err) {
      callback(err);
    } else {
      if (response.statusCode == 200) {
        var user = JSON.parse(response.body);
        callback(null, user);
      } else {
        callback("Invalid status code");
      }
    }
  });
}

function getUserPosts(id, callback) {
  request.get("https://jsonplaceholder.typicode.com/users/".concat(id, "/posts"), function (err, response) {
    if (err) {
      callback(err);
    } else {
      if (response.statusCode == 200) {
        var posts = JSON.parse(response.body);
        callback(null, posts);
      } else {
        callback("Invalid status code");
      }
    }
  });
}

function getUserWithPosts(id, callback) {
  getUser(id, function (err, user) {
    if (err) {
      callback(err);
    } else {
      getUserPosts(id, function (err, posts) {
        if (err) {
          callback(err);
        } else {
          user.posts = posts;
          callback(null, user);
        }
      });
    }
  });
}

getUserWithPosts(1, function (err, user) {
  if (err) {
    console.log(err);
  } else {
    console.log(user);
  }
});