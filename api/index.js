const express=require('express')
const app=express();
const mongoose=require("mongoose");
require('dotenv').config();
const imageDownloader = require('image-downloader');
const Place = require('./modeles/AppartementModel.js');
const cors=require('cors') //permet la comminucation  entre les deux addr du front et back
const fs= require('fs')
const multer=require('multer')
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));
app.use(express.json())
mongoose.connect(process.env.MONGO_URL);
const db=mongoose.connection;
db.on('connected',()=>{
    console.log('database connected')
    console.log(process.env.MONGO_URL)
})

app.get('/test',(req,res)=>{
    res.send('hi')
    //afficher tous les appartements
app.post("/appartement",(req,res)=>{
 const appartement={}
})
})


/* app.post('/upload-by-link',(req,res)=>{
  

  const {link}=req.body;
  const newName= 'photo' +Date.now()+ '.jpg'
  console.log(link)

  
   imageDownloader.image({
    url: link,
    dest: __dirname+ '/uploads/' +newName,
  })
  res.json(newName,) 
}); */

const photosMiddleware = multer({dest: 'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    console.log(req.files[i])
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path + '.' + ext;
    fs.renameSync(path,newPath);
    uploadedFiles.push(newPath.replace('uploads',''));
    res.json(uploadedFiles);
  }
});

app.post('/places', (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  console.log("bdd connected")
   const {
    title,address,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
    const placeDoc = Place.create({
      title,address,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    });
   
    res.json(placeDoc); 
  })
   

  app.get('/places/all', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json( await Place.find() );
  });

  app.get('/places/:id',async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {id}= req.params;
    console.log(id)
    res.json(await Place.findById(id))
  })

  


app.listen(4000)