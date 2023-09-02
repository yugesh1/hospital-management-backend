const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Inventory = require("../models/inventoryModel");

exports.createItem = catchAsyncErrors(async (req, res) => {
  const item = await Inventory.create(req.body);

  res.status(201).json({
    success: true,
    item,
  });
});

exports.getSingleItem = catchAsyncErrors(async (req, res) => {
  const item = await Inventory.findById(req.params.id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "No Item Found",
    });
  }

  res.status(200).json({
    success: true,
    item: item,
  });
});

exports.getAllItems = catchAsyncErrors(async (req, res) => {
  const items = await Inventory.find();

  if (!items) {
    return res.status(404).json({
      success: false,
      message: "No Items Found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Items fetched successfully",
    items,
  });
});

exports.updateItem = catchAsyncErrors(async (req, res) => {
  let item = await Inventory.findById(req.params.id);

  if (!item) {
    return res.status(500).json({
      success: false,
      message: "Item not found",
    });
  }

  item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    item,
  });
});

exports.deleteItem = catchAsyncErrors(async (req, res, next) => {
  const item = await Inventory.findById(req.params.id);

  if (!item) {
    return next(new ErrorHandler("Item Not Found ", 500));
  }

  await item.remove();

  res.status(200).json({
    success: true,
    message: "Item Deleted Successfully",
  });
});
