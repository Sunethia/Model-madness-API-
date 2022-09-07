const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");
const middleware = require("../middleware/auth");
router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM products", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//gets one product
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM products where id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// Add
router.post("/", (req, res) => {
  console.log(req.user);
  if (req.user.userrole === "admin") {
    const { title, category, description, imgURL, price, quantity } = req.body;
    try {
      con.query(
        `INSERT INTO products (title, category, description, imgURL, price, user_id, quantity) values ('${title}','${category}','${description}','${imgURL}','${price}','${req.user.id}','${quantity}')`,
        (err, result) => {
          if (err) throw err;
          res.send(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(500).json({
      status: "error",
      error: "Not Allowed",
    });
  }
});
// Edit
router.put("/:id", middleware, (req, res) => {
  const { title, category, description, imgURL, price, quantity } = req.body;
  try {
    con.query(
      `UPDATE products SET title = "${title}", category = "${category}", description = "${description}", imgURL = "${imgURL}", price = "${price}", user_id = "${req.user.id}", quantity = "${quantity}" WHERE id = "${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
// Delete by id
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE FROM products WHERE id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
