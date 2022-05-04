const express = require('express');
var bodyParser = require('body-parser');

const route = require('./route/route');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://REYNIL310609:OnIYmcfVuOkV0Dkr@cluster0.csvzw.mongodb.net/Project2Intern?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB_connected"))
    .catch(err => console.log(err))
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});