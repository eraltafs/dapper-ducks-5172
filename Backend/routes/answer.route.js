const express = require("express")

const {answerModel} = require("../models/answer.model")
const {questionModel} = require("../models/question.model")
const answerRouter =express.Router()

answerRouter.get("/",async(req,res)=>{
    
    const {question_id} =  req.query
    const answer = await answerModel.find({question_id})
    
    res.send(answer)
})

answerRouter.post("/create",async(req,res)=>{
    try{
        const answer = new answerModel(req.body)
        await answer.save()
        res.send({msg:"answer saved"})
    }catch(err){
        console.log(err)
        res.send({msg:"something wrong while saving answer"})
    }
})
answerRouter.patch("/update/:answer_id",async(req,res)=>{
    answer_id = req.params.answer_id
    user_id = req.body.user_id
    try{
        const answer = await answerModel.findOne({_id:answer_id})
        if(answer){
            if(answer?.user_id==user_id){
                await answerModel.findByIdAndUpdate({_id:answer_id},req.body)
                res.send({msg:"answer updated"})
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
answerRouter.delete("/delete/:answer_id",async(req,res)=>{
    answer_id = req.params.answer_id
    user_id = req.body.user_id
    try{
        const answer = await answerModel.findOne({_id:answer_id})
        if(answer){
            if(answer?.user_id==user_id){
                await answerModel.findByIdAndDelete({_id:answer_id},req.body)
                res.send({msg:"answer deleted"})
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
module.exports = {answerRouter}