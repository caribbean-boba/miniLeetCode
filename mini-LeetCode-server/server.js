const express = require('express');
const app = express();
var restApiRouter = require('./routes/rest-api');
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var path = require("path");

mongoose.connect('mongodb://yanhan:lyh19970409@ds249415.mlab.com:49415/minileetcode', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/api',restApiRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
