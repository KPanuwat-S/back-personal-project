const productService = require("../services/productService");
const uploadService = require("../services/uploadService");
exports.getAllProductModels = async (req, res, next) => {
  try {
    const allProductModels = await productService.getAllModelsforAdmin();
    res.status(200).json(allProductModels);
  } catch (err) {
    next(err);
  }
};

exports.getOneProductModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await productService.getOneProductModel(id);
    res.status(200).json(model);
  } catch (err) {
    next(err);
  }
};
exports.createProductModel = async (req, res, next) => {
  try {
    const { name, description, discount, price, categoryId, genderId, sizes } =
      req.body;
    const data = { name, description, discount, price, categoryId, genderId };
    const createdModel = await productService.createProductModel(data);
    // size= []
    const bulkSizesData = sizes.map((size) => {
      return { sizeId: size, productModelId: createdModel.id };
    });
    console.log("bulkSize", bulkSizesData);
    const createdSize = await productService.createProductSizes(bulkSizesData);
    res.status(200).json(createdModel);
  } catch (err) {
    next(err);
  }
};

exports.uploadMultipleImages = async (req, res, next) => {
  try {
    console.log("img", req.body.image);
    const url = await uploadService.uploadImage(req.body.image);
    console.log("url ---- ja", url);
    res.status(200).send(url);
  } catch (err) {
    next(err);
  }
};

exports.editProductModel = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const editedModel = await productService.editProductModel(id, data);
    res.status(200).json(editedModel);
  } catch (err) {
    next(err);
  }
};

exports.deleteProductModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProductModel(id);
    res.status(204).json();
  } catch (err) {}
};

exports.deleteProductItem = async (req, res, next) => {
  try {
    const { colorId } = req.body;
    console.log("colorId", colorId);
    const { id } = req.params;
    await productService.deleteProductItemById(id, colorId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
exports.createProductItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imgs, colorId, quantity } = req.body;
    const productSizeIdArray = await productService.findProductSizeId(id);

    const createdImages = await productService.createImages(imgs);
    const createdProductColor = await productService.createProductColor(
      id,
      colorId
    );

    const productImgsArray = createdImages.map((el) => {
      const productImg = {
        imgId: el.id,
        productColorId: createdProductColor.id,
      };
      return productImg;
    });

    const productItemsArray = productSizeIdArray.map((el) => {
      const productItem = {
        productColorId: createdProductColor.id,
        productModelId: id,
        productSizeId: el.id,
        stockQuantity: quantity[el.sizeId],
      };
      return productItem;
    });

    const createdProductImg = await productService.createProductImg(
      productImgsArray
    );
    const createdProductItem = await productService.createProductItem(
      productItemsArray
    );
    res.status(200).json(createdProductItem);
  } catch (err) {
    next(err);
  }
};

exports.updateProductItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imgs, colorId, quantity } = req.body;

    // const updatedImages = await productService.updateImgs(imgId, imgs);
  } catch (err) {
    next(err);
  }
};

exports.getProductCategories = async (req, res, next) => {
  try {
    console.log("running---");
    const category = await productService.getCategories();
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};
