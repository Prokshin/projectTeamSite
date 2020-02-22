const express = require("express");
const viewController = require("../controllers/viewsController");

const router = express.Router();
router.get("/", viewController.getHome);
router.get("/project", viewController.getAllProjects);
router.get("/project/:id", viewController.getProject);
router.get("/team", viewController.getTeam);
router.get("/team/:id", viewController.getMember);
router.get("/news", viewController.getAllNews);
router.get("/contact", viewController.getContact);
router.get("/achievments", viewController.getAchievments);
router.get("/vacancy", viewController.getVacancy);
router.post("/vacancy", viewController.postVacancy);
module.exports = router;
