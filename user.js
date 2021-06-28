const express=require('express')

const conn=require('./mysql');

const Router=express.Router()


Router.get('/',(req,res)=>{
res.send("hello World")
})



Router.post('/login',(req,res)=>{
    let email=req.body.email
    let password=req.body.password

    conn.query('select * from login where email=? and password=?',[email,password],(err,rows,filed)=>{

        if(!err)
        {
            if(rows.length)
            {
                let id
                if(Array.isArray(rows))
                {
                    id=rows[0].id
                }
                else{
                    id=rows.id
                }
                return     res.send({message:"Login sucessful",status:true,userdata:id})
            }
            else{
             return    res.send({message:"invalid login",status:false})

            }

        }
        else{
            res.send(err)
        }

    })
})





Router.post('/register',(req,res)=>{
    console.log("in")
    let email=req.body.email
    let password=req.body.password
    let cnfpass=req.body.cnfpass

    conn.query(`insert into login (email,password) VALUES ('${email}','${password}')`,(err,result)=>{

        // if(!err)
        // {
        //     if(rows.length)
        //     {
        //         return     res.send({message:" sucessful",status:true})
        //     }
        //     else{
        //      return    res.send({message:"invalid",status:false})

        //     }

        // }
        // else{
        //     res.send(err)
        // }
        
        
        if (!err){
            return    res.send({message:"Register sucessful",status:true})
        }
        else{
            res.send({message:"Register unsucessful",status:false})
        }
    })
})












module.exports=Router