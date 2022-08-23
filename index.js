const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 6969); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
}); // home route

const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);

const productsRoute = require("./routes/productRoute");
app.use("/products", productsRoute);

// app.get("/", function (req, res) {
//   res.sendFile(_dirname + "/" + "login.html");
// });
// app.get("/", function (req, res) {
//   res.sendFile(_dirname + "/" + "register.html");
// });
// app.get("/", function (req, res) {
//   res.sendFile(_dirname + "/" + "reset_password.html");
// });

// app.listen(app.get("port"), () => {
//   console.log(`Listening for calls on port ${app.get("port")}`);
//   console.log("Press Ctrl+C to exit server");
// });//listening for API calls
const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});