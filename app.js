const { json } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const multer = require('../backEnd/images/multer-config')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://synthejazz:Open1988@cluster0.cy1mk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use('/api/sauce',(req, res, next) =>{

    const stuff =[
        {
            userId: 'rtyuiio',
            name: 'jeune',
            manufacturer: 'azert',
            description :'erty',
            imageUrl: '',
            heat: 1,
            likes: 2,
            dislikes: 3,
            usersLiked: ['azert','quert'],
            usersDisliked:['azert','quert'] 
        }
    ]

res.status(200).json(stuff)

})


app.use(bodyParser.json())

app.use('/api/auth', userRoutes)
module.exports= app;