PROBLEM_LIST = [
    {id: 1, name: "two sum", description: "two sum desc", level: "easy", image: ""},
    {id: 2, name: "8 queen", description: "8 queen desc", level: "hard", image: ""}
  ]

var ProblemModel = require("../models/problemModel");

function getAllTrainingProblems (){
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function (error, problems){
            if (error) {
                reject(error);
            } else {
                resolve(problems);
            }
        });
    });
}

function getProblemById(id) {
    return new Promise((resolve,reject) => {
        ProblemModel.findOne({ id: id }, function (err, problem) {
          if (err) {
            reject(err);
          } else {
            resolve(problem);
          }
        });
    });
}

function addProblem(newProblem) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name: newProblem.name}, function (error, problem){
            if (problem){
                reject("The problem already exists");
            } else {
                ProblemModel.count({}, function(error, count) {
                    newProblem.id = count+1;
                    var temp = new ProblemModel(newProblem);
                    temp.save();
                    resolve(newProblem);
                });
            }
        });
    });
}

module.exports = {
    getAllTrainingProblems: getAllTrainingProblems,
    getProblemById: getProblemById,
    addProblem:addProblem
}