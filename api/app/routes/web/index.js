import express from 'express';
const webRouter = express.Router();
import storeRouter from './store/store.route.js'
import bannerRouter from './banner/banner.route.js'
import productCategoryRouter from './product-category/route.js'
import productRouter from './product/route.js'
import urlRouter from './url/route.js'
import brandRouter from './brand/route.js'
import newsRouter from './news/news.route.js'
import aboutRouter from './about/route.js'
import orderRouter from './order/route.js'
import viewRouter from './view/route.js'

webRouter.use(viewRouter)
webRouter.use(storeRouter)
webRouter.use(bannerRouter)
webRouter.use(productCategoryRouter)
webRouter.use(productRouter)
webRouter.use(urlRouter)
webRouter.use(brandRouter)
webRouter.use(newsRouter)
webRouter.use(aboutRouter)
webRouter.use(orderRouter)

export default webRouter