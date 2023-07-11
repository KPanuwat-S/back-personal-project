const { Op } = require("sequelize");

const {
  ProductModel,
  ProductItem,
  ProductSize,
  ProductColor,
  Gender,
  Color,
  Size,
  Category,
  ProductImg,
  Img,
  CartItem,
} = require("../models");

// Query
exports.getCartItem = async (id) => {
  const cartItems = await CartItem.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["createdAt", "updatedAt", "productItemId", "userId"],
    },
    include: {
      model: ProductItem,
      attributes: {
        exclude: ["createdAt", "updatedAt", "productSizeId"],
      },
      include: {
        model: ProductColor,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: ProductModel,
          },
          { model: ProductImg, include: Img },
          { model: ProductItem, include: ProductSize },
        ],
      },
    },
  });
  const eachItem = cartItems.map((el) => {
    return {
      id: el.id,
      name: el.ProductItem.ProductColor.ProductModel.name,
      productModelId: el.ProductItem.ProductColor.ProductModel.id,
      price: el.ProductItem.ProductColor.ProductModel.price,
      discount: el.ProductItem.ProductColor.ProductModel.discount,
      size: el.sizeId,
      color: el.colorId,
      quantity: el.quantity,
      imgs: el.ProductItem.ProductColor.ProductImgs.map(
        (el) => el.Img.imgAddress
      ),
      stock: el.ProductItem.stockQuantity,
    };
  });
  // const img = await ProductModel.findOne({ where: {id:} });
  return eachItem.reverse();
  return cartItems;
};

exports.addItemToCart = async (item) => await CartItem.create(item);
exports.findProductColorId = async (productModelId, colorId) =>
  await ProductColor.findOne({ where: { productModelId, colorId } });
exports.findProductSizeId = async (productModelId, sizeId) =>
  await ProductSize.findOne({ where: { productModelId, sizeId } });

exports.findItemById = async (productModelId, productColorId, productSizeId) =>
  await ProductItem.findOne({
    where: {
      productModelId: productModelId,
      productColorId: productColorId,
      productSizeId: productSizeId,
    },
  });

exports.updateItemInCart = async (id, item) =>
  await CartItem.update(
    {
      quantity: item.quantity,
      productItemId: item.productItemId,
      sizeId: item.size,
      colorId: item.color,
    },
    { where: { id } }
  );

exports.deleteItemById = async (id) =>
  await CartItem.destroy({ where: { id } });
