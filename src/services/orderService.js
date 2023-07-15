const {
  CartItem,
  Order,
  OrderItem,
  ProductItem,
  ProductImg,
  ProductColor,
  Img,
  ProductModel,
} = require("../models");
const productItem = require("../models/productItem");

exports.getCartItemForOrder = async (userId) =>
  await CartItem.findAll({
    where: { userId },
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
    raw: true,
  });

exports.createBulkOrderItem = async (items, t) =>
  await OrderItem.bulkCreate(items, { trasaction: t });

exports.deleteItemsFromCart = async (userId, t) =>
  await CartItem.destroy({ where: { userId } }, { trasaction: t });

// { quantity: 1, sizeId: 1, colorId: 1, userId: 1, productItemId: 61 }
exports.deleteStockQuantity = async (item, t) => {
  console.log("item in delete stock", item);
  const productItem = await ProductItem.findOne({
    where: { id: item.productItemId },
  });
  console.log("productItem", productItem.stockQuantity);
  const updatedQuantity = await ProductItem.update(
    { stockQuantity: productItem.stockQuantity - item.quantity },
    { where: { id: item.productItemId } },
    { trasaction: t }
  );
  console.log("updatedQuantity", updatedQuantity);
  return updatedQuantity;
};

exports.getOrderItems = async (userId) => {
  const rawDatas = await OrderItem.findAll({
    where: { userId },
    include: [
      {
        model: ProductItem,

        include: [
          { model: ProductModel },
          {
            model: ProductColor,
            include: [{ model: ProductImg, include: Img }],
            attibutes: ["ProductColor"],
          },
        ],
      },
    ],
  });
  const transFromedData = rawDatas.map((rawData) => {
    return {
      id: rawData.id,
      name: rawData.ProductItem.ProductModel.name,
      price: rawData.ProductItem.ProductModel.price,
      quantity: rawData.quantity,
      sizeId: rawData.sizeId,
      colorId: rawData.colorId,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
      userId: 1,
      productItemId: 71,
      img: rawData.ProductItem.ProductColor.ProductImgs[0].Img.imgAddress,
    };
  });
  return transFromedData;
  return rawDatas;
};
