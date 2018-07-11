var mongoose = require("mongoose");
var problemSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    level: String,
});

var problemModel = mongoose.model("ProbmeModel", problemSchema);
module.exports = problemModel;
