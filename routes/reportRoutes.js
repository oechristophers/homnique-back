const express = require("express")
const router = express.Router();

const createReportController = require("../controllers/report/createReportController")
const getReportController = require("../controllers/report/getReportController")
const getSingleReportController = require("../controllers/report/getSingleReportController")
const updateReportController = require("../controllers/report/updateReportController");
const deleteReportController = require("../controllers/report/deleteReportController")


//REPORT_ROUTE
router.post('/reports', createReportController);
router.get('/reports', getReportController);
router.get('/reports/:id', getSingleReportController);
router.put('/reports/:id', updateReportController);
router.delete('/reports/:id', deleteReportController);

module.exports = router;
