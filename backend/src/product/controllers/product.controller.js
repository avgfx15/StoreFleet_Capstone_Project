// Please don't change the pre-written code
// Import the necessary modules here

import { ErrorHandler } from "../../../utils/errorHandler.js";
import {
  addNewProductRepo,
  deleProductRepo,
  findProductRepo,
  getAllProductsRepo,
  getProductDetailsRepo,
  getTotalCountsOfProduct,
  updateProductRepo,
} from "../model/product.repository.js";
import ProductModel from "../model/product.schema.js";


// $ Add New Product
export const addNewProduct = async (req, res, next) => {
  try {
    const product = await addNewProductRepo({
      ...req.body,
      createdBy: req.user._id,
    });
    if (product) {
      res.status(201).json({ success: true, product });
    } else {
      return next(new ErrorHandler(400, "some error occured!"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};


// $ Get all Products By search || Pagination || Filter
export const getAllProducts = async (req, res, next) => {
  // Implement the functionality for search, filter and pagination this function.
  try {
    // Extract the keyword, page number, category, price, and rating from the request query parameters
    const { keyword, page = 1, category, priceLte, priceGte, ratingLte, ratingGte } = req.query;

    // Create a regex pattern from the keyword for case-insensitive matching
    const pattern = new RegExp(keyword, 'i');

    // Calculate the number of documents to skip for pagination
    const skip = (page - 1) * 5;

    // Create a query object
    let query = { name: pattern };

    // Add category, price, and rating filters to the query if they exist
    if (category) query.category = category;
    if (priceLte && priceGte) query.price = { $lte: priceLte, $gte: priceGte };
    // if (priceLte) query.price = { $lte: priceLte };
    // if (priceGte) query.price = { $gte: priceGte };
    if (ratingLte && ratingGte) query.rating = { $lte: ratingLte, $gte: ratingGte };
    // if (rating) query.rating = { $gte: rating };

    // Query the database
    const products = await ProductModel.find(query).skip(skip).limit(5);

    // Send the response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// $ Update Product by params.Id
export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await updateProductRepo(req.params.id, req.body);
    if (updatedProduct) {
      res.status(200).json({ success: true, updatedProduct });
    } else {
      return next(new ErrorHandler(400, "Product not found!"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ Delete Product by params.Id
export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await deleProductRepo(req.params.id);
    if (deletedProduct) {
      res.status(200).json({ success: true, deletedProduct });
    } else {
      return next(new ErrorHandler(400, "Product not found!"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ Get Product By params.Id
export const getProductDetails = async (req, res, next) => {
  try {
    const productDetails = await getProductDetailsRepo(req.params.id);
    if (productDetails) {
      res.status(200).json({ success: true, productDetails });
    } else {
      return next(new ErrorHandler(400, "Product not found!"));
    }
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $  Rate Product by params.productId
export const rateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { rating, comment } = req.body;
    const user = req.user._id;
    const name = req.user.name;
    const review = {
      user,
      name,
      rating: Number(rating),
      comment,
    };
    if (!rating) {
      return next(new ErrorHandler(400, "rating can't be empty"));
    }
    const product = await findProductRepo(productId);
    if (!product) {
      return next(new ErrorHandler(400, "Product not found!"));
    }
    const findRevieweIndex = product.reviews.findIndex((rev) => {
      return rev.user.toString() === user.toString();
    });
    if (findRevieweIndex >= 0) {
      product.reviews.splice(findRevieweIndex, 1, review);
    } else {
      product.reviews.push(review);
    }
    let avgRating = 0;
    product.reviews.forEach((rev) => {
      avgRating += rev.rating;
    });
    const updatedRatingOfProduct = avgRating / product.reviews.length;
    product.rating = updatedRatingOfProduct;
    await product.save({ validateBeforeSave: false });
    res
      .status(201)
      .json({ success: true, msg: "thx for rating the product", product });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

// $  get reviews Of Product by params.Id
export const getAllReviewsOfAProduct = async (req, res, next) => {
  try {
    const product = await findProductRepo(req.params.id);
    if (!product) {
      return next(new ErrorHandler(400, "Product not found!"));
    }
    res.status(200).json({ success: true, reviews: product.reviews });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// $ Delete Review By query productId & reviewId
export const deleteReview = async (req, res, next) => {
  // Insert the essential code into this controller wherever necessary to resolve issues related to removing reviews and updating product ratings.
  try {
    const user = req.user._id;
    const { productId, reviewId } = req.query;
    if (!productId || !reviewId) {
      return next(
        new ErrorHandler(
          400,
          "pls provide productId and reviewId as query params"
        )
      );
    }
    const product = await findProductRepo(productId);
    if (!product) {
      return next(new ErrorHandler(400, "Product not found!"));
    }
    const reviews = product.reviews;

    const isReviewExistIndex = reviews.findIndex((rev) => {
      return rev._id.toString() === reviewId.toString() && rev.user.toString() === user.toString();
    });
    console.log(isReviewExistIndex);
    if (isReviewExistIndex < 0) {
      return next(new ErrorHandler(400, "You are not authorized  to perform this action!"));
    }

    const reviewToBeDeleted = reviews[isReviewExistIndex];
    console.log(reviewToBeDeleted);
    reviews.splice(isReviewExistIndex, 1);

    //? Update Rating
    let avgRating = 0;
    product.reviews.forEach((rev) => {
      avgRating += rev.rating;
    });
    const updatedRatingOfProduct = avgRating / product.reviews.length;
    product.rating = updatedRatingOfProduct;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      msg: "review deleted successfully",
      deletedReview: reviewToBeDeleted,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};
