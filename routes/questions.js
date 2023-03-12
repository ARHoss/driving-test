const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, questionsController.getQuestion);

router.get("/nextQuestion/:id", ensureAuth, questionsController.getNextQuestion);

router.get("/previousQuestion/:id", ensureAuth, questionsController.getPreviousQuestion);

router.post("/createQuestion", ensureAuth, questionsController.createQuestion);

router.put("/completedQuestion/:id", ensureAuth, questionsController.completedQuestion);

router.delete("/deleteQuestion/:id", ensureAuth, questionsController.deleteQuestion);

module.exports = router;
