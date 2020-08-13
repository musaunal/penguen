const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM product";
let loged_in = 0;
let logged_username = "";

const connetion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1071",
  database: "penguen"
});

connetion.connect(err => {
  if(err){
    console.log(err);
    return err;
   
    }
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






///////////////////////////////////////////////////////

app.get("/login", (req,res) => {
  const {username,pass} = req.query;
  const CHECK_USER_QUERY = `SELECT * 
  FROM users
  WHERE User_ID = "${username}" AND Password = ${pass}
  `

  connetion.query(CHECK_USER_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
      loged_in = 1;
      logged_username = username;
      return res.send(results);
  });
});
/*
app.get("/add_adress", (req,res) => {
  const {adress} = req.query;
  const ADD_ADDRESS_QUERY = `INSERT INTO ADDRESS 
  (Product_ID, Name, Price, Photo, Stock, Star, Bonus) 
  VALUES(
    "${Product_ID}", "${Name}", "${Price}", "${Photo}", "${Stock}", s"${Star}", "${Bonus}"
  )
  `

  connetion.query(CHECK_USER_QUERY, (err, results) => {
    if(err)
      return res.send("User Not Found")
    else
      loged_in = 1;
      logged_username = username;
      return res.send("Successfully logged in");
  });
});
*/
app.get("/comment", (req,res) => {
  const {product_id, star, comment} = req.query;
  const COMMENT_QUERY = `INSERT INTO comments 
  (Product_ID, Username, Date, Comment,Star) 
  VALUES(
    "${product_id}", "${logged_username}", Date(), "${comment}", "${star})  `//////////////////////

  connetion.query(COMMENT_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
      return res.send("Comment added successfully");
  });
});

app.get("/comments", (req,res) => {
  const {id} = req.query;
  const COMMENT_QUERY = `SELECT * FROM comments 
    WHERE Product_ID = "${id}" `

  connetion.query(COMMENT_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
      return res.send(results);
  });
});


app.get("/categorize", (req,res) => {
  const {category} = req.query;
  const CATEGORY_QUERY = `SELECT * FROM pruduct
  WHERE "${product_id}" in(SELECT "${product_id}" FROM "${category}")
`//////////////////////

  connetion.query(CATEGORY_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});
app.get("/sort", (req,res) => {
  const {sort_type} = req.query;
  const SORT_QUERY = `SELECT * FROM pruduct
  ORDER BY "${sort_type}"`


  connetion.query(SORT_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});



app.get("/product/info", (req,res) => {
  const {p_id} = req.query;
  const INFO_QUERY = `SELECT * FROM pruduct
  WHERE  Product ="${p_id}"`


  connetion.query(INFO_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});


app.get("/product/info", (req,res) => {
  const {p_id} = req.query;
  const INFO_QUERY = `SELECT * FROM pruduct
  WHERE Product_ID = "${product_id}"`


  connetion.query(INFO_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});

app.get("/user/address", (req,res) => {
  const {username_} = req.query;
  const ADDRESS_QUERY = `SELECT Address FROM users
  WHERE User_ID = "${username_}"`


  connetion.query(ADDRESS_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});



app.get("/user/address_update", (req,res) => {
  const {username_,new_address} = req.query;
  const UPDATE_ADDRESS_QUERY = `UPDATE users Set Address = "${new_address}"
  WHERE User_ID = "${username_}"`


  connetion.query(UPDATE_ADDRESS_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.send("Address changed successfully");
  });
});


app.get("/order/save", (req,res) => {
  const {Order_ID_, Username_, Price_, Cargo_price_,Order_date_,Total_bonus_,Address_,City_name_} = req.query;
  const SAVE_ORDER_QUERY = `INSERT INTO orders (Order_ID, Username, Price, Cargo_price,Order_date,Total_bonus,Address,City_name)
  VALUES ("${Order_ID_}", "${Username_}", "${Price_}", "${Cargo_price_}","${Order_date_}","${Total_bonus_}","${Address_}","${City_name_}");
  "`


  connetion.query(SAVE_ORDER_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});

app.get("/supply", (req,res) => {
  const {Supplier_ID_,Product_ID_,Piece_} = req.query;
  const SUPPLY_QUERY = `INSERT INTO contain (Supplier_ID,Product_ID,Piece)
  VALUES ("${Supplier_ID_}","${Product_ID_}","${Piece_}");
   `


  connetion.query(SUPPLY_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.send("Supplyed successfully");
  });
});





app.get("/order/save", (req,res) => {
  const {Order_ID_, Username_, Price_, Cargo_price_,Order_date_,Total_bonus_,Address_,City_name_} = req.query;
  const SAVE_ORDER_QUERY = `INSERT INTO orders (Order_ID, Username, Price, Cargo_price,Order_date,Total_bonus,Address,City_name)
  VALUES ("${Order_ID_}", "${Username_}", "${Price_}", "${Cargo_price_}","${Order_date_}","${Total_bonus_}","${Address_}","${City_name_}");
  "`


  connetion.query(SAVE_ORDER_QUERY, (err, results) => {
    if(err)
      return res.send(err)
    else
    return res.json({
      data: results
    })
  });
});


///////////////////////////////////
app.listen(4000, () => {
  console.log("app is listening on port 4000")
});