 import bcrypt from "bcryptjs"
import db from "../models";
import e from "express";
import { where } from "sequelize";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            let hashPassFromBcrypt = await hashUserPass(data.password)
            await db.User.create({
                email: data.email,
                password: hashPassFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === "1"?true : false,
                roleId: data.role,
            })
            resolve("ok")
        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPass = (password)=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let hashPass = await bcrypt.hashSync(password, salt)
            resolve(hashPass)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = ()=>{
    return new Promise( async(resolve, reject)=>{
        try {
            let users = await db.User.findAll()
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById =(userId)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let users =await db.User.findOne({
                where: {id:userId},
                raw: true
            })
            if(users){
                resolve(users)
            }else{
                resolve([])
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateAboutData = async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id: data.id}
            })
            if(user){
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address 
                user.phoneNumber = data.phoneNumber 
              
                await user.save()
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            }else{
                resolve()
            }
        } catch (error) {
            console.log(error)
        }
    })
    // console.log("data from service");
    
    
}
let deleteUserById = (userId)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where:{ id: userId}
            })
            if(user){
                await user.destroy()
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    hashUserPass: hashUserPass,
    getAllUsers: getAllUsers,
    getUserInfoById: getUserInfoById,
    updateAboutData: updateAboutData,
    deleteUserById: deleteUserById
}