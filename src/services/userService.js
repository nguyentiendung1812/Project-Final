import { where } from "sequelize"
import db from "../models"
import bcrypt from "bcryptjs"
import { raw } from "body-parser"

let handleUserLogin = (email, password)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let userData={}
            let isExist = await checkUserEmail(email)
            if(isExist){
                let user= await db.User.findOne({
                    attributes: ['email', 'id','password'],
                    where:{email : email},
                    raw:true
                })
                if(user){
                    let check = bcrypt.compareSync(password, user.password)
                    // let check = true
                    if(check){
                        userData.errCode = 0
                        userData.errMessage= `Finish!`
                        delete user.password
                        userData.user = user

                    }else{
                        userData.errCode = 3
                        userData.errMessage= `Pass fail!`
                    }
                }else{
                    userData.errCode =2
                    userData.errMessage = `User not found`
                }
            }else{
                userData.errCode = 1
                userData.message = `Your email doesn't exist in your system. Plz try other email`
            }
            resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user= await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin
}