// const {
//   ProductModel,
//   ProductItem,
//   ProductSize,
//   ProductColor,
//   Gender,
// } = require("../models");
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
  const { colorId } = req.query;
  try {
    const productDetail = await productService.getProductDetail(productModelId);
    res.status(200).json({ productDetail });
  } catch (err) {
    next(err);
  }
};

exports.addItemTocart = async (req,res,next)=>{
  const {}=req.body
}