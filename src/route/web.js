import express from "express"
import homeController from "../controllers/homeController"
import userController from '../controllers/userController'
let router = express.Router()

let innitWebRoutes = (app)=>{

    router.get('/', homeController.getHomePage)
    router.get('/about', homeController.getAboutPage)

    router.post('/post-about', homeController.postAbout)
    router.get('/get-about', homeController.getAbout)
    router.get('/edit-about', homeController.editAbout)
    router.post('/put-about', homeController.putAbout)

    router.get('/delete-about', homeController.deleteAbout)
    router.post('/api/login', userController.handleLogin)

    
    router.get('/', (req, res)=>{
        return res.send("hello world")
    })
    

    return app.use("/",router)

}
module.exports = innitWebRoutes
