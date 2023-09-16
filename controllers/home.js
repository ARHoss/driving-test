// User database variable
const User = require('../models/User')

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs", { currentPage:'index' });
  },
  getProfile: async (req, res) => {
    try {
      res.render("profile.ejs", { user: req.user, currentPage:'profile', results: req.user.scores });
    } catch (err) {
      console.log(err);
      res.render("errors/500.ejs")
    }
  },
  setScore: async (req, res) => {
    try {

      console.log(req.user._id)

      // Receives data from front-end
      const data = {
        _id:req.user._id
      }

      const score = Number(req.params.result);

       // Mongo updated request
      await User.findOneAndUpdate(
        data,
        {
        // Changing data
        $push: { 
          scores: {
            score: score,
            dateCompleted: new Date()
          }
        },
        
        },
        { new: true }, // To get the updated document
      )

      // Redirect to /profile route
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
      res.render("errors/500.ejs")
    }
  },
  markComplete: async (req, res)=>{
    try{// Try block to throw error

        // Receives data from front-end
        const data = {
            _id:req.body.todoIdFromJSFile
        }
        // Mongo updated request
        await Todo.findOneAndUpdate(data,{
            // Changing data
            completed: true
        })
        // Sending response back to front-end
        res.json('Marked Complete')
    }catch(err){// Catch block to handle error
        // Printing error to console
        console.error(err)
    }
}
};
