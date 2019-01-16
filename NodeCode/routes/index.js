const express = require("express");
const router = express.Router();

//request/response. Request gets an object in, Response is a method that sends data back to the user
//NEXT also exists. more info later
router.get("/", (req, res) => {
  const tony = { name: "Tony", age: 30, cool: true };
  //CAN ONLY SEND DATA TO THE BROWSER *ONCE*
  // res.send("Hey! It works!!!!!!!!");
  // res.json(tony); //sends json object instead of text
  // res.send(req.query.name);
  // res.json(req.query);
  // res.render("hello"); //renders the 'hello.pug' file to the view
  res.render("hello", {
    name: "Tony",
    dogs: ["Olive", "Betty"],
    cat: req.query.cat,
    age: 30,
    cool: true,
    title: "Foodaholic"
  });
});

router.get("/reverse/:name", (req, res) => {
  //:name is a way to put variables into a route
  const reversed = [...req.params.name].reverse().join("");
  res.send(reversed);
});

module.exports = router;

//REQ has all the information.
//RES has all the methods for sending data back
//req.query to get query paramaters
//check EXPRESS docs for more info
