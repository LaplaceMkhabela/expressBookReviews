const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  axios.get('http://localhost:5000/')
    .then((response) => {
      return res.status(200).send(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      return res.status(500).send(JSON.stringify({message: "Error fetching books"}, null, 2));
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then((response) => {
      return res.status(200).send(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      return res.status(500).send(JSON.stringify({message: "Error fetching book details"}, null, 2));
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  axios.get(`http://localhost:5000/author/${author}`)
    .then((response) => {
      return res.status(200).send(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      return res.status(500).send(JSON.stringify({message: "Error fetching books by author"}, null, 2));
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  axios.get(`http://localhost:5000/title/${title}`)
    .then((response) => {
      return res.status(200).send(JSON.stringify(response.data, null, 2));
    })
    .catch((error) => {
      return res.status(500).send(JSON.stringify({message: "Error fetching books by title"}, null, 2));
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 2));
});

module.exports.general = public_users;
