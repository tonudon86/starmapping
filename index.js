
const conn=require('./mysql');
const express=require('express');
const body=require('body-parser').json()
const cors=require('cors')
const user=require('./user')
const contact=require('./contact')
const checkout=require('./checkout')
const path=require('path')

const app=express()

const PORT=process.env.PORT || 5000



app.use(body)
app.use(cors())


app.use('/api',user)
app.use('/api/contact',contact)
app.use('/api/checkout',checkout)
app.get('/api/admin',(req,res)=>{  
  
    

    conn.query('select * from checkout ORDER by createddate DESC;',(err,rows,filed)=>{

        if(!err)
        {
            if(rows.length)
            {
                console.log(rows)
                return     res.send(rows)
              
            }
            else{
             return    res.send({message:"invalid login regisert frist",status:false})

            }

        }
        else{
            res.send(err)
        }

    })
    // res.send([{name:'order1'},{name:'order2'},{name:'order7'}])

})
 



app.use(express.static('frontend/build'))

app.get('*',(req,res)=>{

    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))

})



app.listen(PORT,()=>{
console.log("server",PORT)
})