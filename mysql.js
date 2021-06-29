const mysql=require('mysql');

var conn=mysql.createConnection({
    host:'localhost',
    user:'starmapp_suryasen',
    password:'suryasen',
    multipleStatements:true,
    database:'starmapp_tonu'
})

// var conn=mysql.createConnection({
//     host:'localhost',
//     user:'starmapp_suryasen',
//     password:'suryasen',
//     multipleStatements:true,
//     database:'starmapp_tonu'
// })


conn.connect((err)=>{

    if(!err)
    {
        console.log("connected")
    }
    else{
        console.log(err)
    }
})


module.exports=conn