var express = require("express");
var router = express.Router();
var trainingProblemService = require('../services/training-problem-service');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/training-problem-list", function(req, res) {
    trainingProblemService.getAllTrainingProblems().then(problems => {
        res.json(problems);
    })
});

router.get("/training-problem-list/:id", function(req, res) {
    var id = req.params.id;
    trainingProblemService.getProblemById(+id).then(problem => {
        res.json(problem);
    })
});

router.post("/training-problem-list", jsonParser, function(req, res) {
    console.log(req.body);
    trainingProblemService.addProblem(req.body).
    then(function(problem){
        res.json(problem);
    }, function(error){
        res.status(400).send("Already exists");
    })
});

module.exports = router;