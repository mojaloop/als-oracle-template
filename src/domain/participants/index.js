
'use strict'

const ParticipantsModel = require('../../models/participants/{Type}/{ID}')
require('dotenv').config();
const Boom = require('boom');
const Joi=require('joi');

const TYPE_REGEX = new RegExp(process.env.TYPE_REGEX,"i");
const IDENTIFIER_REGEX = new RegExp(process.env.IDENTIFIER_REGEX,"i");
const SUPPORTED_CURRENCY_REGEX = new RegExp(process.env.SUPPORTED_CURRENCY_REGEX,"i");

module.exports = {
    getParticipantsByTypeAndID: async function (type, identifier) {
       
        const identifierSchema=Joi.object().keys({
            Type:Joi.string().regex(TYPE_REGEX).required(),
            ID:Joi.string().regex(IDENTIFIER_REGEX).length(14).required()
        });

        var response=null;

        Joi.validate(
            {
                Type:type,ID:identifier
            },identifierSchema, (err,value)=>{
                if(err){
                    //console.log(err);
                    response= err.message;
                }else{
                    var accountNumber=value.ID;
                    var bankCode=accountNumber.substring(0,3);
                     
                    response = ParticipantsModel.get.default(bankCode)       
                }
            }
        )

         return  response;

    },
    createParticipant: async function (fspId,currency) {

        const participantSchema=Joi.object().keys({
            CURRENCY:Joi.string().regex(SUPPORTED_CURRENCY_REGEX).required(),
            FSPID:Joi.string().regex(IDENTIFIER_REGEX).length(3).required(),
            
            
        });
        var response=null;

        try {


            Joi.validate(
                {
                    CURRENCY:currency,FSPID:fspId
                },participantSchema, (err,value)=>{
                    if(err){
                        console.log(err);
                        response= err.message;
                    }else{
                      
                        response = ParticipantsModel.post.default(fspId,currency)
               
                    }
                }
            )

         return  response

        } catch (err) {
            throw err
        }
                        


    }, updateParticipant: async function (fspId,currency) {

        const participantSchema=Joi.object().keys({
            CURRENCY:Joi.string().regex(SUPPORTED_CURRENCY_REGEX).required(),
            FSPID:Joi.string().regex(IDENTIFIER_REGEX).length(3).required(),
            
            
        });
        var response=null;

        try {


            Joi.validate(
                {
                    CURRENCY:currency,FSPID:fspId
                },participantSchema, (err,value)=>{
                    if(err){
                        console.log(err);
                        response= err.message;
                    }else{
                      
                        response = ParticipantsModel.put.default(fspId,currency)
               
                    }
                }
            )

         return  response

        } catch (err) {
            throw err
        }
                        


    },deleteParticipant: async function (fspId) {
        const participantSchema=Joi.object().keys({
           
            FSPID:Joi.string().regex(IDENTIFIER_REGEX).length(3).required()
            
            
        });
        var response=null;

        try {


            Joi.validate(
                {
                    FSPID:fspId
                },participantSchema, (err,value)=>{
                    if(err){
                        console.log(err);
                        response= err.message;
                    }else{
                      
                        response = ParticipantsModel.delete.default(fspId)
               
                    }
                }
            )

         return  response

        } catch (err) {
            throw err
        }

    }
}