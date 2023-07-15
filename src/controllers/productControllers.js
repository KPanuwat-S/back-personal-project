const productService = require("../services/productService");


exports.getAllProducts = async (req, res, next) => {
  try {
    const allProductModels = await productService.getAllProductModelforCard();
    res.status(200).json({ allProductModels });
  } catch (err) {
    next(err);
  }
};

exports.getProductColors = async (req, res, next) => {
  const { productModelId } = req.params;
  try {
    const allColorsOfProduct = await productService.getProductColors(
      productModelId
    );
    res.status(200).json({ allColorsOfProduct });
  } catch (err) {
    next(err);
  }
};

exports.getProductSize = async (req, res, next) => {
  const { productModelId } = req.params;
  try {
    const allSizeAvailable = await productService.getProductSize(
      productModelId
    );
    res.status(200).json({ allSizeAvailable });
  } catch (err) {
    next(err);
  }
};

exports.getProductCategory = async (req, res, next) => {
  const { productModelId } = req.params;
  try {
    const productCategory = await productService.getProductCategory(
      productModelId
    );
    res.status(200).json({ productCategory });
  } catch (err) {
    next(err);
  }
};

exports.getProductDetail = async (req, res, next) => {
  const { productModelId } = req.params;
  try {
    const productDetail = await productService.getProductDetail(productModelId);
    res.status(200).json({ productDetail });
  } catch (err) {
    next(err);
  }
};

// exports.addItemTocart = async (req,res,next)=>{
//   const {}=req.body
// }

exports.getProductItem = async (req, res, next) => {
  const { modelId, colorId, sizeId } = req.query;
  console.log("query", req.query);
  try {
    const productItemId = await productService.getProductItemId(
      modelId,
      colorId,
      sizeId
    );
    res.status(200).json({ id: productItemId });
  } catch (err) {
    next(err);
  }
};

exports.getMaleProduct = async (req, res, next) => {
  const { genderId } = req.params;
  const { categoryId } = req.query;
  console.log("genderId", genderId);
  let maleProduct;
  try {
    if (categoryId) {
      maleProduct = await productService.getGenderedProductModelQuery(
        genderId,
        categoryId
      );
    } else {
      maleProduct = await productService.getGenderedProductModelforCard(
        genderId
      );
    }
    res.status(200).json(maleProduct);
  } catch (err) {
    next(err);
  }
};
