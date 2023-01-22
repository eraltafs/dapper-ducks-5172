const express = require("express")

const {questionModel} = require("../models/question.model")
const questionRouter =express.Router()


questionRouter.post("/create",async(req,res)=>{
    try{
        const question = new questionModel(req.body)
        await question.save()
        res.send({msg:"question saved"})
    }catch(err){
        console.log(err)
        res.send({msg:"something wrong while saving question"})
    }
})
questionRouter.patch("/update/:question_id",async(req,res)=>{
    question_id = req.params.question_id
    user_id = req.body.user_id
    try{
        const question = await questionModel.findOne({_id:question_id})
        if(question){
            if(question?.user_id==user_id){
                await questionModel.findByIdAndUpdate({_id:question_id},req.body)
                res.send({msg:"question updated"})
            }else{
                res.send({msg:"You are unauthorized"})
            }
        }else{
            res.send({msg:"wrong id"})
        }
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
})
questionRouter.delete("/delete/:question_id",async(req,res)=>{
    question_id = req.params.question_id
    user_id = req.body.user_id
    try{
        const question = await questionModel.findOne({_id:question_id})
        if(question){
            if(question?.user_id==user_id){
                await questionModel.findByIdAndDelete({_id:question_id},req.body)
                res.send({msg:"question deleted"})
            }else{
                res.send({msg:"You are unauthorized"})
            }
        }else{
            res.send({msg:"wrong id"})
        }
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
})
module.exports = {questionRouter}