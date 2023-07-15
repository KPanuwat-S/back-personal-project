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
} = require("../models");

// Query

// Read
exports.getProductColors = async (productModelId) => {
  const productColors = await ProductColor.findAll({
    where: { productModelId: productModelId },
    include: Color,
  });
  return productColors;
};

exports.getProductGender = async (productModelId) => {
  const productGender = await ProductModel.findAll({
    where: { productModelId: productModelId },

    include: Gender,
  });
  return productGender;
};

exports.getProductSize = async (productModelId) => {
  const productSize = await ProductItem.findAll({
    where: {
      productModelId: productModelId,
    },
    include: [{ model: ProductSize, include: Size }],
  });
  return productSize;
};

exports.getProductCategory = async (productModelId) => {
  const productCategory = await ProductModel.findAll({
    where: { id: productModelId },
    include: Category,
  });
  return productCategory;
};

exports.getAllModelsforAdmin = async () => {
  const allModels = await ProductModel.findAll({
    include: Category,
  });
  return allModels;
};

exports.getOneProductModel = async (id) => {
  const model = await ProductModel.findOne({
    where: { id },
    include: Category,
  });

  return model;
};
// Data model for Card Item
// data ={name:, pic:, color: [],price,gender:,category}
exports.getAllProductModelforCard = async () => {
  const productModelForCard = await ProductModel.findAll({
    include: [
      {
        model: ProductItem,

        include: [
          {
            model: ProductColor,
            include: [{ model: ProductImg, include: Img }],
            attibutes: ["ProductColor"],
          },
        ],
      },
    ],
  });

  const transformedProductObject = productModelForCard.map((el) => {
    const colorArray = el.ProductItems.map((el) => el.ProductColor.colorId);
    const uniqueColor = Array.from(new Set(colorArray));
    const productObject = {
      id: el.id,
      name: el.name,
      description: el.description,
      discount: el.discount,
      price: el.price,
      createdAt: el.createdAt,
      gender: el.genderId,
      category: el.categoryId,
      color: uniqueColor,
      imgs: el.ProductItems[0].ProductColor.ProductImgs.map(
        (el) => el.Img.imgAddress
      ),
    };
    return productObject;
  });
  // return productModelForCard;
  return transformedProductObject;
};

exports.getGenderedProductModelforCard = async (genderId) => {
  // const productModelForCard = await ProductModel.findAll({
  //   where: { genderId, categoryId },
  //   include: [
  //     {
  //       model: ProductItem,

  //       include: [
  //         {
  //           model: ProductColor,
  //           include: [{ model: ProductImg, include: Img }],
  //           attibutes: ["ProductColor"],
  //         },
  //       ],
  //     },
  //   ],
  // });

  const productModelForCard = await ProductModel.findAll({
    where: { genderId },
    include: [
      {
        model: ProductItem,

        include: [
          {
            model: ProductColor,
            include: [{ model: ProductImg, include: Img }],
            attibutes: ["ProductColor"],
          },
        ],
      },
    ],
  });

  const transformedProductObject = productModelForCard.map((el) => {
    const colorArray = el.ProductItems.map((el) => el.ProductColor.colorId);
    const uniqueColor = Array.from(new Set(colorArray));
    const productObject = {
      id: el.id,
      name: el.name,
      description: el.description,
      discount: el.discount,
      price: el.price,
      createdAt: el.createdAt,
      gender: el.genderId,
      category: el.categoryId,
      color: uniqueColor,
      imgs: el.ProductItems[0].ProductColor.ProductImgs.map(
        (el) => el.Img.imgAddress
      ),
    };
    return productObject;
  });
  // return productModelForCard;
  return transformedProductObject;
};

exports.getGenderedProductModelQuery = async (genderId, categoryId) => {
  const productModelForCard = await ProductModel.findAll({
    where: { genderId, categoryId },
    include: [
      {
        model: ProductItem,

        include: [
          {
            model: ProductColor,
            include: [{ model: ProductImg, include: Img }],
            attibutes: ["ProductColor"],
          },
        ],
      },
    ],
  });

  const transformedProductObject = productModelForCard.map((el) => {
    const colorArray = el.ProductItems.map((el) => el.ProductColor.colorId);
    const uniqueColor = Array.from(new Set(colorArray));
    const productObject = {
      id: el.id,
      name: el.name,
      description: el.description,
      discount: el.discount,
      price: el.price,
      createdAt: el.createdAt,
      gender: el.genderId,
      category: el.categoryId,
      color: uniqueColor,
      imgs: el.ProductItems[0].ProductColor.ProductImgs.map(
        (el) => el.Img.imgAddress
      ),
    };
    return productObject;
  });

  return transformedProductObject;
};

exports.getProductDetail = async (productModelId) => {
  const productDetail = await ProductColor.findAll({
    where: { productModelId: productModelId },
    include: [
      {
        model: ProductModel,
      },
      { model: ProductImg, include: Img },
      { model: ProductItem, include: ProductSize },
    ],
  });

  const transformProductDetail = productDetail.map((el) => {
    const productDetailObject = {
      id: el.id,
      colorId: el.colorId,
      name: el.ProductModel.name,
      description: el.ProductModel.description,
      discount: el.ProductModel.discount,
      price: el.ProductModel.price,
      createdAt: el.ProductModel.createdAt,
      categoryId: el.ProductModel.categoryId,
      genderId: el.ProductModel.genderId,
      imgs: el.ProductImgs.map((el) => el.Img.imgAddress),
      sizes: el.ProductItems.map((el) => el.ProductSize.sizeId),
      productItemId: el.ProductItems.map((el) => el.id),
      stockQuantity: el.ProductItems.map((e) => {
        return { id: e.ProductSize.sizeId, quantity: e.stockQuantity };
      }),
      productModelId,
    };
    return productDetailObject;
  });
  // return productDetail;
  return transformProductDetail;
};

exports.getProductItemId = async (modelId, colorId, sizeId) => {
  const productItemId = await ProductItem.findOne({
    include: { model: ProductColor, where: { colorId: colorId } },
    where: {
      [Op.and]: [{ productModelId: modelId }, { productSizeId: sizeId }],
    },
  });

  console.log(productItemId);
  return productItemId.id;
};

// Create
exports.createProductModel = async (data) => await ProductModel.create(data);

exports.editProductModel = async (id, data) =>
  await ProductModel.update(data, { where: { id } });

exports.deleteProductModel = async (id) => {
  // await ProductSize.destroy({ where: { productModelId: id } });
  // await ProductColor.destroy({ where: { productModelId: id } });
  await ProductModel.destroy({ where: { id } });
};

exports.createProductSizes = async (bulkSize) =>
  await ProductSize.bulkCreate(bulkSize);

// Create Product Item

exports.createImages = async (bulkImages) => await Img.bulkCreate(bulkImages);
exports.createProductColor = async (productModelId, colorId) =>
  await ProductColor.create({ productModelId, colorId });
exports.createProductImg = async (bulkProductImg) =>
  // imgId, productColorId
  await ProductImg.bulkCreate(bulkProductImg);
exports.createProductItem = async (bulkProductItem) =>
  await ProductItem.bulkCreate(bulkProductItem);

exports.findProductSizeId = async (productModelId) =>
  await ProductSize.findAll({ where: { productModelId } });

// Get Category
exports.getCategories = async () => await Category.findAll({});

// Update

// Delete
exports.deleteProductItemById = async (id, colorId) =>
  await ProductColor.destroy({
    where: { productModelId: id, colorId: colorId },
  });
