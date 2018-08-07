var port = 3000 || process.env.PORT;


const path = require("path");
const express = require("express");




// The reusable paths 
const publicPath = path.join(__dirname , "../public");



//app setup
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port ${port} !`)
})