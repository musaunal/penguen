const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM product";

const connetion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1071",
  database: "penguen"
});

connetion.connect(err => {
  if(err)
    return err;
});

app.use(cors());

app.get("/", (req,res) => {
  res.send("hello from server")
});

app.get("/product/add", (req,res) => {
  const { Product_ID, Name, Price, Photo, Stock, Star, Bonus} = req.query;
  const INSERT_PRODUCT_QUERY = `INSERT INTO product 
    (Product_ID, Name, Price, Photo, Stock, Star, Bonus) 
    VALUES(
      "${Product_ID}", "${Name}", "${Price}", "${Photo}", "${Stock}", "${Star}", "${Bonus}"
    )`

  connetion.query(INSERT_PRODUCT_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
      return res.send("successfully added product");
  });
});

app.get("/product", (req,res) => {
  connetion.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) =>{
    if(err)
      return res.send(err)
    else
      return res.json({
        data: results
      })
  });
});

app.listen(4000, () => {
  console.log("app is listening on port 4000")
});