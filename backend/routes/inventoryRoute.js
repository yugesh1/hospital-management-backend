const express = require("express");

const {
  createItem,
  getSingleItem,
  getAllItems,
  deleteItem,
  updateItem,
} = require("../controller/inventoryController");

const router = express.Router();

router.route("/inventory/new").post(createItem);

router.route("/inventory/all").get(getAllItems);
router
  .route("/inventory/:id")
  .get(getSingleItem)
  .delete(deleteItem)
  .put(updateItem);

module.exports = router;
