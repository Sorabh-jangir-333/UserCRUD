const express = require("express");
const app = express();
const path = require("path");
const userModel = require('./models/user'); 

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home Page
app.get("/", (req, res) => {
  res.render("index");
});

// Read Users
app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", { users });
});

// Create User
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect("/read");
});

// Edit User Page
app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render("edit", { user });  // Corrected variable name and removed "/"
});

// Update User
app.post('/update/:userid', async (req, res) => {
    let { image, name, email } = req.body;
    await userModel.findOneAndUpdate({ _id: req.params.userid }, { image, name, email },);
    res.redirect("/read"); 
});

// Delete User
app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
