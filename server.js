const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const exp = require('constants');

// Initialize the app
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))
//app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for contact form data
const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle POST request to store form data
app.post('/submit-form', async (req, res) => {
  const { fullname, email, message } = req.body;

  const newContact = new Contact({ fullname, email, message });

  try {
    await newContact.save();
    res.status(200).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save contact' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
