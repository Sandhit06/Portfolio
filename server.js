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


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});