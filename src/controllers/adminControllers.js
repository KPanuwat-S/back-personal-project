const productService = require("../services/productService");

exports.getAllProductModels = async (req, res, next) => {
  try {
    const allProductModels = await productService.getAllModelsforAdmin();
    res.status(200).json(allProductModels);
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

exports.createProductItem = async (req, res, next) => {
  // {imgs:[1,2,3],
  // colorId:"", quantity:{1:100,2:100}}
  try {
    const { id } = req.params;
    const { imgs, colorId, quantity } = req.body;
    const productSizeIdArray = await productService.findProductSizeId(id);

    // const [createdImages, createdProductColor] = await Promise.all[
    //   (productService.createImages(imgs),
    //   productService.createProductColor(id, colorId))
    // ];

    const createdImages = await productService.createImages(imgs);
    const createdProductColor = await productService.createProductColor(
      id,
      colorId
    );

    console.log("created---", createdProductColor);
    const productImgsArray = createdImages.map((el) => {
      const productImg = {
        imgId: el.id,
        productColorId: createdProductColor.id,
      };
      return productImg;
    });

    // console.log("productImgsArray", productImgsArray);
    const productItemsArray = productSizeIdArray.map((el) => {
      const productItem = {
        productColorId: createdProductColor.id,
        productModelId: id,
        productSizeId: el.id,
        stockQuantity: quantity[el.sizeId],
      };
      return productItem;
    });
    // console.log("productItemsArray", productItemsArray);
    // const [createdProductImg, createdProductItem] = await Promise.all[
    //   (productService.createProductImg(productImgsArray),
    //   productService.createProductItem(productItemsArray))
    // ];

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
