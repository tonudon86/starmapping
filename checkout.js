const express = require("express");

const conn = require("./mysql");

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("hello World");
});

Router.post("/neworder", (req, res) => {
 
  let name=req.body.name
  let email=req.body.email
  let number=req.body.number
  let add=req.body.add
  let orderdetail=req.body.starmap

  conn.query(
    `insert into checkout (name,email,number,address,orderdetail) VALUES (?,?,?,?,?)`,[name,email,number,add,orderdetail],(err,rows,result) => {
    

      if (!err) {
        return res.send({ message: "order sucessful", status: true });
      } else {
        console.log(err)
        res.send({ message: "order failed", status: false,err });
      }
    }
  );
});

module.exports = Router;
