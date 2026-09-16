const express = require("express");

const router = express.Router();

const {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");
  const validateRecord =require("../middleware/validation")

// GET all
router.get("/", getAllRecords);

// GET one
router.get("/:id", getRecordById);

// CREATE
router.post("/",validateRecord, createRecord);

// UPDATE
router.put("/:id",validateRecord, updateRecord);

// DELETE
router.delete("/:id", deleteRecord);

module.exports = router;