const cartService = require("../services/cartService");

exports.addItemToCart = async (req, res, next) => {

  try {
    const user = req.user;
    const { productModelId, colorId, sizeId, quantity } = req.body;
    const productColorId = await cartService.findProductColorId(
      productModelId,
      colorId
    );
    console.log("---product color", productColorId.id);
    const productSizeId = await cartService.findProductSizeId(
      productModelId,
      sizeId
    );
    console.log("---product size", productSizeId.id);
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
