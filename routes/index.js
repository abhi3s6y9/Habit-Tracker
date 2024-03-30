const express = require("express");
const router = express.Router();

const habitController = require("../controllers/homeController");

// For rendering different pages and controllers
router.get("/", habitController.load);
router.post("/add-habit", habitController.add);
router.get("/delete-habit", habitController.delete);
router.get("/view-habit", habitController.viewHabit);
router.get("/find-habit", habitController.fetchHabit);
router.get("/update-db-date", habitController.updateDates);

module.exports = router;