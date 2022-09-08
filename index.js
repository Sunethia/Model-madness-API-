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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const userRoute = require("./routes/userRoute");
app.use("/users", userRoute);

const productsRoute = require("./routes/productRoute");
app.use("/products", productsRoute);

const cart = require("./routes/cart");
app.use(cart);

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
