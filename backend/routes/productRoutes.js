import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import { addProduct,updateProductDetails,removeProduct,fetchProducts ,fetchProductsById,fetchAllProducts,addReview,fetchTopProducts, fetchNewProducts} from "../controllers/productController.js";
const router =express.Router();
router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin,formidable(),addProduct);
router.route("/all").get(fetchAllProducts);
router.route("/topproducts").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts)
router.route("/:id/reviews").post(authenticate, checkId,addReview);

router.route('/:id').get(fetchProductsById).put(authenticate,authorizeAdmin,formidable(),updateProductDetails).delete(authenticate,authorizeAdmin,removeProduct);;


export default router