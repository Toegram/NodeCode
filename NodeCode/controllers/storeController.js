exports.homePage = (req, res) => {
  console.log(req.name);
  res.render("index");
};

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store'})
}

exports.createStore = (req, res) => {
  res.json(req.body)
}

// exports.myMiddleware = (req, res, next) => {
//   req.name = "Tony";
//   // res.cookie("name", "Tony Rulez", { maxAge: 1000 });
//   if (req.name === "Tony") {
//     throw Error("Fuck you, Tony");
//   }
//   next();
// };
