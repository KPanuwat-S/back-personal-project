const cartService = require("../services/cartService");

exports.addItemToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productModelId, colorId, sizeId, quantity } = req.body;
    const productColorId = await cartService.findProductColorId(
      productModelId,
      colorId
    );

    const productSizeId = await cartService.findProductSizeId(
      productModelId,
      sizeId
    );

    const productItemId = await cartService.findItemById(
      productModelId,
      productColorId.id,
      productSizeId.id
    );

    const itemToBeAdded = {
      quantity,
      productItemId: productItemId.id,
      userId: user.id,
      sizeId,
      colorId,
    };
    const itemInCart = await cartService.addItemToCart(itemToBeAdded);
    res.status(200).json(itemToBeAdded);
  } catch (err) {
    next(err);
  }
};



exports.getItemFromCart = async (req, res, next) => {
  try {
    const user = req.user;
    const itemInCart = await cartService.getCartItem(user.id);
    res.status(200).json(itemInCart);
  } catch (err) {
    next(err);
  }
};

exports.updateItemFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productModelId, color, size, quantity } = req.body;
    console.log("quantity", quantity);
    const productColorId = await cartService.findProductColorId(
      productModelId,
      color
    );

    const productSizeId = await cartService.findProductSizeId(
      productModelId,
      size
    );

    const productItemId = await cartService.findItemById(
      productModelId,
      productColorId.id,
      productSizeId.id
    );

    const itemToBeEdited = {
      quantity,
      productItemId: productItemId.id,
      size,
      color,
    };

    console.log("itemToBeEdited", itemToBeEdited);

    const editedItem = await cartService.updateItemInCart(id, itemToBeEdited);
    console.log("editedItem", editedItem);
    res.status(200).json(editedItem);
  } catch (err) {
    next(err);
  }
};

exports.deleteItemFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    await cartService.deleteItemById(id);
    res.status(200).json({ message: "delete complete" });
  } catch (err) {
    next(err);
  }
};
