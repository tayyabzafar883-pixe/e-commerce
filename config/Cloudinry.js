console.log('start')
let cloudinary=require('cloudinary').v2
console.log('hy')

cloudinary.config({
  cloud_name: process.env.name,
  api_key: process.env.key,
  api_secret: process.env.Cpassword
});