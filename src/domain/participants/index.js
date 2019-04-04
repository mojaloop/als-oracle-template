
'use strict'


const ParticipantsModel = require('../../models/participants/index')
const ConfigurationModel = require('../../models/configuration')

module.exports = {
    getByParticipantId: async function (bankCode) {
   
        return await ParticipantsModel.getByParticipantId(bankCode)
       
    },
    createParticipant: async function (fspId, currency) {
        return await ParticipantsModel.createParticipant(fspId, currency)
        
      //  return await  ParticipantsModel.post.default(fspId, currency)
        
    }, updateByParticipantId: async function (fspId, currency) {

        return await ParticipantsModel.updateByParticipantId(fspId, currency)
 

    }, deleteByParticipantId: async function (fspId) {
        return await ParticipantsModel.deleteByParticipantId(fspId)
    }, getConfiguration: async function(){
        return await ConfigurationModel.getConfiguration()
    }
}