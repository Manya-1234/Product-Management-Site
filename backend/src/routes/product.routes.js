import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {createProduct, getProducts, updateProduct, deleteProduct} from "../controllers/product.controllers.js"

const router= Router()

router.route('/').post(upload.single("image"),createProduct)
router.route('/').get(getProducts)
router.route('/:id').put(upload.single("image"),updateProduct)
router.route('/:id').delete(deleteProduct)
export {router}