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
    // "ProductItems": [
    //   {
    //       "id": 22,
    //       "stockQuantity": 100,
    //       "createdAt": "2023-05-01T00:00:00.000Z",
    //       "updatedAt": "2023-05-01T00:00:00.000Z",
    //       "productColorId": 2,
    //       "productModelId": 1,
    //       "productSizeId": 4,
    //       "ProductColor": {
    //           "id": 2,
    //           "colorId": 2,
    //           "productModelId": 1,
    //           "ProductImgs": [
    //               {
    //                   "id": 8,
    //                   "imgId": 6,
    //                   "productColorId": 2,
    //                   "Img": {
    //                       "id": 6,
    //                       "imgAddress": "https://static.zara.net/photos///2023/V/0/1/p/1887/411/250/2/w/1126/1887411250_2_2_1.jpg?ts=1675764549921"
    //                   }
    //               },
    //               {
    //                   "id": 7,
    //                   "imgId": 5,
    //                   "productColorId": 2,
    //                   "Img": {
    //                       "id": 5,
    //                       "imgAddress": "https://static.zara.net/photos///2023/V/0/1/p/1887/411/250/2/w/1126/1887411250_2_1_1.jpg?ts=1675764550254"
    //                   }
    //               },
    //               {
    //                   "id": 6,
    //                   "imgId": 4,
    //                   "productColorId": 2,
    //                   "Img": {
    //                       "id": 4,
    //                       "imgAddress": "https://static.zara.net/photos///2023/V/0/1/p/1887/411/250/2/w/1126/1887411250_1_1_1.jpg?ts=1675764547320"
    //                   }
    //               }
    //           ]
    //       }
    //   },

    return productObject;
  });

  return transformedProductObject;
};

// Data model for product detail

// {
//   "id": 1,
//   "name": "basic t-shirt",
//   "description": "Loose-fit T-shirt made of compact cotton. Round neck and short sleeves.",
//   "discount": "0",
//   "price": "550",
//   "createdAt": "2023-05-01T00:00:00.000Z",
//   "gender": 1,
//   "category": 1,
//   "color": 1,
//   "size": []
//   "imgs": []
// }
// where: {colorId: color}
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
