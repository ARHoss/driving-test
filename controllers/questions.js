const Question = require("../models/Question");


module.exports = {
    getQuestion: async (req, res) => {
        try {
            
            const question = await Question.findOne().sort({ "_id" : 1 }).limit(1);
            res.render("question.ejs", { question: question, user: req.user });
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    getNextQuestion: async (req, res) => {
        try {
          const question = await Question.findOne({_id: {$gt: req.params.id }}).limit(1);
          if(question != null){
            res.render("question.ejs", { question: question, user: req.user });
          }else{
            res.send("<h1>All Questions Answered</h1>");
          }
          
        } catch (err) {
          console.log(err);
          res.render("errors/404.ejs")
        }
    },
    getPreviousQuestion: async (req, res) => {
        try {
          const question = await Question.findOne({_id: {$lt: req.params.id}}).sort({_id: -1}).limit(1);
          if(question != null){
            res.render("question.ejs", { question: question, user: req.user });
          }else{
            res.send("<h1>Went too back</h1>");
          }
          
        } catch (err) {
          console.log(err);
          res.render("errors/404.ejs")
        }
    },
    createQuestion: async (req, res) => {
        try {
            
            await Question.create({
                title: req.body.title,
                answer: req.body.answer,
            });
            console.log("Question has been added!");
            res.redirect('/profile');
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    completedQuestion: async (req, res) => {
        try {
            await Question.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { users: req.user },
                }
            );
            console.log("User Inserted");
            res.redirect(`/question`);
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    deleteQuestion: async (req, res) => {
        try {
            // Delete post from db
            await Question.remove({ _id: req.params.id });
            console.log("Deleted Question");
            res.redirect("/profile");
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
};
