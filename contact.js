const express=require('express')

const conn=require('./mysql');

const Router=express.Router()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lasth324@gmail.com',
    pass: '8369619945'
  }
});

Router.get('/',(req,res)=>{
res.send("contact from")
// console.log("tonu")
})


Router.post('/',(req,res)=>{
    let name=req.body.name
    let email=req.body.email
    let subject=req.body.subject
    let message=req.body.msg

    conn.query(`insert into contact (name,email,subject,message) VALUES ('${name}','${email}','${subject}','${subject}')`,(err,result)=>{   

        if (!err){
            var mailOptions = {
                from: `${email}`,
                to: 'tonudon86@gmail.com',
                subject: `${name} ${subject}`,
                text: `contact from :${name}  ${email}  ${subject}   ${message}  `
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            return    res.send({message:`${name} thanks for contacting us `,status:true})
        }
        else{
   
            res.send({message:"your from could not submited",status:false})
        }
    })




    })
Router.post('/subs',(req,res)=>{
    let email=req.body.email
    conn.query(`insert into email (email) VALUES ('${email}')`,(err,result)=>{
        if(!err){
            return res.send({message:"thanks for subscribing us ",status:true})
        }
        else {
            return res.send({message:"not subscribes ",status:false})
        }




    } )
  

})

module.exports=Router