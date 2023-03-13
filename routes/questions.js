const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const { ensureAuth, ensureGuest, ensureAdmin } = require("../middleware/auth");


router.get("/", ensureAuth, questionsController.getQuestion);

router.get("/:id", ensureAuth, questionsController.getCurrentQuestion);

router.get("/nextQuestion/:id", ensureAuth, questionsController.getNextQuestion);

router.get("/previousQuestion/:id", ensureAuth, questionsController.getPreviousQuestion);

router.post("/createQuestion", ensureAuth, questionsController.createQuestion);

router.put("/completedQuestion/:id", ensureAuth, questionsController.completedQuestion);

router.delete("/deleteQuestion/:id", ensureAdmin, questionsController.deleteQuestion);

module.exports = router;
