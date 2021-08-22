const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/contact', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    more: String
});
const Contact = mongoose.model('Contactdetails', ContactSchema);

app.use(express.urlencoded());

app.use('/static', express.static('static')) 
// For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) 


app.get('/', (req, res)=>{
   
    res.status(200).render('home.pug');
})
app.get('/contact', (req, res)=>{
    
    res.status(200).render('contact.pug');
});

app.post('/contact', (req, res)=>{
    let mydata=new Contact(req.body);
    mydata.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the database")
    })
    
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});