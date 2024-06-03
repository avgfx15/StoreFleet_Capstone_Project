import ProductModel from "./product.schema.js";

// $ Add New Product
export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

// $ Get All Product
export const getAllProductsRepo = async () => {
  return await ProductModel.find({}).limit(2)
    .sort({ createdAt: 1 });
};

// $ Update Product By Id
export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

// $ Delete Product By Id
export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

// $ Get Product Details By Id
export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

// $ Get total Counts of Products
export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

// $ Find Product By productId
export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
