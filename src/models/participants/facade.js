'use strict'


 const Db = require('@mojaloop/central-services-database').Db

const Facade = {
  getByParticipantId: async function (participantId) {
    try {
        let partyList = await Db.participant.query(builder => {
            return builder
            .join('currencyParticipant','participant.name','currencyParticipant.participantId')
            .select('participant.name AS fspId','currencyParticipant.currencyId AS currency')
            .where('participant.name',participantId)
            .andWhere('participant.isActive',1)})

          return {partyList};
    } catch (err) {
        console.log(err)
       throw new Error(err.message)
    }
   
  },

//   createParticipant: async function (fspId, currency) {
    

//     let createParticipant = (fspId) => {
//       try {
       
//         return Db.participant.insert({
//           name: fspId,
//           isActive: 1
//         })
//       } catch (err) {
//         throw err
//       }
//   }

//   let linkcurrencyParticipant = (fspId,currency) => {
//     try {
     
//       return Db.currencyParticipant.insert({
//         currencyId: currency,
//         participantId: fspId
//       })
//     } catch (err) {
//       throw err
//     }
// }

// await createParticipant(fspId)
// await linkcurrencyParticipant(fspId, currency)
// return 'created'

    
//   },

  updateByParticipantId: async function (fspId, currency) {
    const knex = await Db.getKnex()

    return await knex.transaction(async (trx) => {
      try {
       
        await knex('participant').transacting(trx)
          .where({ name : fspId })
          .update({ name: fspId})

          await knex('currencyParticipant').transacting(trx)
          .where({ participantId : fspId })
          .update({
            currencyId: currency,
            participantId: fspId
          })

        await trx.commit
        return 'Ok'
      } catch (err) {
        await trx.rollback
        throw err
      }
    })
      .catch((err) => {
        throw err
      })
  },

  deleteByParticipantId: async function (fspId) {
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
                  
      } catch (err) {
        throw err
      }
   

  },
}

module.exports = Facade
