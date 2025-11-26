let express=require('express')
let cors=require('cors')
let cookie=require('cookie-parser')
let env=require('dotenv').config()
let connect=require('./config/Connect_db')
let user=require('./routes/user')
let product=require('./routes/Product')
let seller=require('./routes/seller')
require('./config/Cloudinry')

let app=express()


let allowOrigin=`https://extraordinary-dango-5f9e51.netlify.app`
app.use(cookie())
app.use(cors({
    origin:allowOrigin,
    credentials:true
}))
app.use(express.json())
connect()
app.get('/',(req,res)=>{
res.send(' chl  rha hy ')
})

app.use('/user',user)
app.use('/addproduct',product)
app.use('/seller',seller)

app.listen(process.env.port,()=>{
    console.log('port is running')
})