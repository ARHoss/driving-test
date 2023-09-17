const Question = require("../models/Question");
const openai = require("../middleware/openai");
const cloudinary = require("../middleware/cloudinary");

// OpenAI API call function
async function callOpenAI(message) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 3000,
        temperature: 0
    });

    return response.data.choices[0].text.trim();
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

async function getQuestion(userId, params){
    
    let question;

    if(params){
        question = await Question.findOne({_id:params});
    }else{
        question = await Question.findOne().sort({ "_id" : 1 }).limit(1);
    }
    
    const answer = question.answer[0]
    const markComplete = await question.users.indexOf(userId) > -1?'is-success':'';
    question.answer = shuffle(question.answer);

    return {question, markComplete, answer}
}

async function getNextPrevQuestion(userId, questionId, nextOrPrev){
    
    let question;
    let markComplete = null;
    let answer;

    if(nextOrPrev == 'next'){
        question = await Question.findOne({_id: {$gt: questionId }}).limit(1);
    }else if(nextOrPrev == 'prev'){
        question = await Question.findOne({_id: {$lt: questionId}}).sort({_id: -1}).limit(1);
        
    }

    if(question != null){
        answer = question.answer[0]
        question.answer = shuffle(question.answer);
        markComplete = await question.users.indexOf(userId) > -1?'is-success':'';
        return {question, markComplete, answer} 
    }

    return {question, markComplete, answer}
}

module.exports = {
    getQuestion: async (req, res) => {
        try {
            
            const {question, markComplete, answer} = await getQuestion(req.user.id)
            res.render("question.ejs", { question: question, answer: answer, user: req.user, markComplete: markComplete });
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    getCurrentQuestion: async (req, res) => {
        try {

            const {question, markComplete, answer} = await getQuestion(req.user.id, req.params.id);
            res.render("question.ejs", { question: question, answer: answer, user: req.user, markComplete: markComplete });
        } catch (err) {
            console.log(err);
            res.render("errors/500.ejs")
        }
    },
    getNextQuestion: async (req, res) => {
        try {

            const {question, markComplete, answer} = await getNextPrevQuestion(req.user.id, req.params.id, 'next')
            if(question != null){
                res.render("question.ejs", { question: question, answer: answer, user: req.user, markComplete: markComplete });
            }else{
                
                // req.flash("nextQuestionError", ['No next question']);
                res.redirect(`/question/finalscore`);

            }
          
        } catch (err) {
          console.log(err);
          res.render("errors/404.ejs")
        }
    },
    getFinalScore: async (req, res) => {
        try {
            res.render("finalscore.ejs");
        } catch (err) {
            console.log('finalscore');
            res.render("errors/500.ejs")
        }
    },
    getPreviousQuestion: async (req, res) => {
        try {

            const {question, markComplete, answer} = await getNextPrevQuestion(req.user.id, req.params.id, 'prev')

            if(question != null){
                res.render("question.ejs", { question: question, answer: answer, user: req.user, markComplete: markComplete });
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

            // Upload image to cloudinary
            let imageURL = null;
            if(req.file && req.file.path){
                imageURL = await cloudinary.uploader.upload(req.file.path);
            }

            
            
            // // Open AI is not free
            // let message = await callOpenAI(`paraphase the statement with the same beginning and provide 3 wrong answer not as a list but seperated by commas only that are close to this answer and no connecting words such as (and) : ${req.body.answer}`);
            // message = message.split(',');

            // Questions & answers
            console.log('Question: '+req.body.title)
            console.log('Answer: '+req.body.answer)
            // console.log('Sample Answers '+message)
            console.log('Answer: '+req.body.answer1)
            console.log('Answer: '+req.body.answer2)
            console.log('Answer: '+req.body.answer3)

            await Question.create({
                title: req.body.title,
                answer: [
                    req.body.answer,
                    // message[0],
                    // message[1],
                    // message[2],
                    req.body.answer1,
                    req.body.answer2,
                    req.body.answer3,
                ],
                imageURL: imageURL && imageURL.secure_url? imageURL.secure_url  : null,
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
