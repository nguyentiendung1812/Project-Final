import { raw } from 'body-parser'
import db from '../models/index'
import aboutService from '../services/aboutService'
let getHomePage = async(req, res)=>{

    try {
         let data = await db.User.findAll()
         return res.render('homePage.ejs', {
            data: JSON.stringify(data)
         })
    } catch (error) {
        console.log(error);
    }
}

let getAboutPage = (req, res)=>{

         return res.render('aboutPage.ejs')
}
let postAbout = async(req, res) =>{
    let mess = await aboutService.createNewUser(req.body)
    console.log(mess);
    return res.send('post about from server')
}

let getAbout = async(req,res)=>{
    let data = await aboutService.getAllUsers({raw: true})
    console.log(data);
    return res.render('getAbout.ejs',{
        data: data
    })
}

let editAbout = async(req, res)=>{
    let userId = req.query.id
    if(userId){
        let userData = await aboutService.getUserInfoById(userId)
        // console.log(userData);
        return res.render('editAbout.ejs', {
            user: userData
        })

    }else{
        return res.send('user notfound')
    }
} 
 
let deleteAbout = async(req,res)=>{
    let id = req.query.id
    if(id){
        await aboutService.deleteUserById(id)
        return res.send('delete finish')
    }
    else{
        return res.send('User not found')
    }
}

let putAbout = async(req, res)=>{
    let data = req.body;
    let allUsers = await aboutService.updateAboutData(data)
    return res.render('getAbout.ejs', {
            data: allUsers
             }) 
}


module.exports= {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    postAbout: postAbout,
    getAbout: getAbout,
    editAbout: editAbout,
    deleteAbout: deleteAbout,
    putAbout: putAbout,

}