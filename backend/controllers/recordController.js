const Record = require("../model/records");

// GET all records
const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    next(error);
  }
};

// GET one record
const getRecordById = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.json(record);
  } catch (error) {
    next(error);
  }
};

// CREATE record
const createRecord = async (req, res, next) => {
  try {
    const {
      date,
      description,
      rent,
      expense,
      expenseDescription,
    } = req.body;

    const newRecord = await Record.create({
      date,
      description,
      rent: Number(rent),
      expense: expense ? Number(expense) : 0,
      expenseDescription: expenseDescription || "",
    });

    res.status(201).json({
      message: "Record created successfully",
      record: newRecord,
    });
  } catch (error) {
    next(error);
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const {
      date,
      description,
      rent,
      expense,
      expenseDescription,
    } = req.body;

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      {
        date,
        description,
        rent: Number(rent),
        expense: expense ? Number(expense) : 0,
        expenseDescription: expenseDescription || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    next(error);
  }
};
// DELETE record
const deleteRecord = async (req, res, next) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRecord) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.json({
      message: "Record deleted successfully",
      record: deletedRecord,
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
};