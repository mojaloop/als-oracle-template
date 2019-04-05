'use strict'


 const Db = require('@mojaloop/central-services-database').Db

const Participant = {
    getParticipant: async function (participantId) {
      
            try {
              return Db.participant.findOne({ name: participantId })
            } catch (err) {
              throw err
            }
          
   
  },

  createParticipant: async function (fspId, currency) {
     
    let createParticipant = (fspId) => {
      try {
       
        return Db.participant.insert({
          name: fspId,
          isActive: 1
        })
      } catch (err) {
        throw err
      }
  }

  let linkcurrencyParticipant = (fspId,currency) => {
    try {
     
      return Db.currencyParticipant.insert({
        currencyId: currency,
        participantId: fspId
      })
    } catch (err) {
      throw err
    }
}

await createParticipant(fspId)
await linkcurrencyParticipant(fspId, currency)
return 'created'

    
  },

  deleteParticipant: async function (fspId) {
    try {
      const knex = await Db.getKnex()
      let participant = async () => { 
       return knex('participant')
            .where({ name : fspId })
            .update({ isActive : 0 })
      }
          let _Participant =await participant()

          if( await participant() === 1) return 'Ok'
          if( await participant() != 1) return 'Error'
          console.log('kinachorudi', _Participant)
        
      } catch (err) {
        throw err
      }
   

  },
}

module.exports = Participant
