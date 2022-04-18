import express from 'express';
const adminRouter = express.Router();
import authorCheck from '../../middleware/authorization.middleware.js';
import viewRouter from './view/route.js';
import authRouter from './auth/auth.route.js';
import uploadRouter from './upload/upload.route.js'
import userRouter from './user/user.route.js'
import newsRouter from './news/news.route.js'
import seoPageRouter from './seo-page/seo-page.route.js'
import storeRouter from './store/store.route.js'
import permissionRouter from './permission/permission.route.js'
import permissionGroupRouter from './permission-group/permission-group.route.js'
import productCategoryRouer from './product-category/route.js'
import bannerRouter from './banner/banner.route.js'
import brandRouter from './brand/route.js'
import productRouter from './product/route.js'
import aboutRouter from './about/route.js'
import orderRouter from './cusorder/route.js'
import othersRouter from './others/route.js'
import attributeRouter from './attribute/route.js'

adminRouter.use(authRouter)
adminRouter.use(authorCheck, viewRouter)
adminRouter.use(authorCheck, uploadRouter)
adminRouter.use(authorCheck, userRouter)
adminRouter.use(authorCheck, newsRouter)
adminRouter.use(authorCheck, seoPageRouter)
adminRouter.use(authorCheck, storeRouter)
adminRouter.use(authorCheck, permissionRouter)
adminRouter.use(authorCheck, permissionGroupRouter)
adminRouter.use(authorCheck, productCategoryRouer)
adminRouter.use(authorCheck, bannerRouter)
adminRouter.use(authorCheck, brandRouter)
adminRouter.use(authorCheck, productRouter)
adminRouter.use(authorCheck, aboutRouter)
adminRouter.use(authorCheck, orderRouter)
adminRouter.use(authorCheck, othersRouter)
adminRouter.use(authorCheck, attributeRouter)

export default adminRouter