var express = require("express");
var router = express.Router();
var trainingProblemService = require('../services/training-problem-service');
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var nodeRestClient = require('node-rest-client').Client;
var restClient = new nodeRestClient();

EXCUTER_SERVER_URL = 'http://localhost:5000/build_and_run'

restClient.registerMethod('build_and_run', EXCUTER_SERVER_URL, 'POST');

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

router.post("/build_and_run", jsonParser, function(req, res) {
    const user_code = req.body.user_code;
    const selected_lang  = req.body.lang;
    console.log(selected_lang + ";" + user_code);
    restClient.methods.build_and_run({
        data: {user_code: user_code, selected_lang: selected_lang},
        headers: {"Content-Type": "application/json"}
    }, (data, response) => {
        console.log("Received");
        const text = `Build output ${data['build']} \n \n
                        Execute output: ${data['run']}`
        data['text'] = text;
        console.log(data);
        res.json(data);
    })
});

module.exports = router;