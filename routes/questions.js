const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questions");
const { ensureAuth, ensureGuest, ensureAdmin } = require("../middleware/auth");
const upload = require("../middleware/multer");


router.get("/", ensureAuth, questionsController.getQuestion);

// router.get("/:id", ensureAuth, questionsController.getCurrentQuestion);

router.get("/nextQuestion/:id", ensureAuth, questionsController.getNextQuestion);

router.get("/previousQuestion/:id", ensureAuth, questionsController.getPreviousQuestion);

router.get("/", ensureAuth, questionsController.getQuestion);

router.get("/finalscore", ensureAuth, questionsController.getFinalScore);

router.post("/createQuestion", ensureAdmin, upload.single("file"), questionsController.createQuestion);

router.put("/completedQuestion/:id", ensureAuth, questionsController.completedQuestion);

router.delete("/deleteQuestion/:id", ensureAdmin, questionsController.deleteQuestion);

module.exports = router;
