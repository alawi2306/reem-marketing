
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const url = 'mongodb+srv://alis2906:Alawi2306@cluster0.r8ptdii.mongodb.net/clientsDB?retryWrites=true';
const mongoose = require("mongoose");

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`Mongoose connection error: ${err}`);
    process.exit(1);
  }
  else {
    console.log("successfully connected to MongoDB")
  }
});



app.set('view engine' , 'ejs');


// app.use((req, res) => {
//   res.status(404).send('Page not found');
// });

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});

app.use(express.static("public"));
app.use('/images', express.static('images'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/", function(req, res) {
  res.render('homepage.ejs', )
  console.log(`Request status code: ${res.statusCode}`);
  
});

// if (require.main === module) {
//   app.listen(process.env.PORT || 3000);
// }



app.get("/sales-page", function(req,res){
    res.render("salespage.ejs")
});

app.get("/contact-us", function(req,res){
  res.render("contact-us.ejs")
});

app.get("/questionnaire", function(req,res){
  res.render("questionnaire.ejs")
  
});

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { 
    type: Number, 
    min: 18, 
    max: 100, 
    required: true 
  },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  marketingExp: { type: String, required: true},
  marketingGoals: { type: String, required: true,
  },
  budget: {
    type: Number,
    min: 0,
    required: true
  },
  desiredTimeFrame: { type: String, required: true,},
  howDidYouHear: { type: String, required: true,}
});


const Form = mongoose.model("Form", FormSchema);

let newForm;

app.post("/thank-you", async (req, res) => {  
  const formData = req.body;  
  console.log(req.body);  
  newForm = new Form({...formData});  

  try {
      await newForm.save();
      return res.redirect("/thank-you");  
  } catch (ex) {
      console.log("Error", ex);
  }
});



app.get("/thank-you", function(req,res){
  res.render("thank-you.ejs")
});

mongoose.set("strictQuery", false);
