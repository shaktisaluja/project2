const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://REYNIL310609:OnIYmcfVuOkV0Dkr@cluster0.csvzw.mongodb.net/Group99database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("Hey shakti, Go ahead ! MongoDB_connected"))
    .catch(err => console.log(err))
app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
