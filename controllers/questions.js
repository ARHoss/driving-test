const Question = require("../models/Question");


module.exports = {
    getQuestion: async (req, res) => {
        try {
            
            const question = await Question.findOne().sort({ "_id" : 1 }).limit(1);
            const markComplete = question.users.indexOf(req.user.id) > -1?'is-success':'';
            res.render("question.ejs", { question: question, user: req.user, markComplete: markComplete });
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    getCurrentQuestion: async (req, res) => {
        try {
            
            const question = await Question.findOne({_id:req.params.id});
            const markComplete = question.users.indexOf(req.user.id) > -1?'is-success':'';
            res.render("question.ejs", { question: question, user: req.user, markComplete: markComplete });
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    getNextQuestion: async (req, res) => {
        try {
          const question = await Question.findOne({_id: {$gt: req.params.id }}).limit(1);
          
          if(question != null){
            const markComplete = question.users.indexOf(req.user.id) > -1?'is-success':'';
            res.render("question.ejs", { question: question, user: req.user, markComplete: markComplete });
          }else{
            
            req.flash("nextQuestionError", ['No next question']);
            res.redirect(`/question/${req.params.id}`);

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
            const markComplete = question.users.indexOf(req.user.id) > -1?'is-success':'';
            res.render("question.ejs", { question: question, user: req.user, markComplete: markComplete });
          }else{
            req.flash("previousQuestionError", ['No previous question']);
            res.redirect(`/question/${req.params.id}`);
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

            const question = await Question.findOne({_id: req.params.id});
            const markComplete = question.users.indexOf(req.user.id) > -1?true:false;

            if(markComplete){
                await Question.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $pull: { users: req.user.id },
                    }
                );
                console.log("User Removed");

            }else{
                await Question.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $push: { users: req.user.id },
                    }
                );
                console.log("User Inserted");
            }
            res.redirect(`/question/${req.params.id}`);
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
            res.redirect("/question");
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
};
