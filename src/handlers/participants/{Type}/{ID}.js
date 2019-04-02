'use strict'

const Boom = require('boom')

const participants = require('../../../domain/participants/index')

/**
 * Operations on /participants/{Type}/{ID}
 */
module.exports = {
  /**
   * summary: Look up participant information
   * description: The HTTP request GET /participants/{Type}/{ID} is used to find out in which FSP the requested Party, defined by {Type} and {ID} is located (for example, GET /participants/MSISDN/123456789). This HTTP request should support a query string to filter FSP information regarding a specific currency only (This similarly applies to the SubId). To query a specific currency only, the HTTP request GET /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
   * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
   * produces: application/json
   * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
   */
  get: async function ParticipantsByTypeAndIDGet (request, h) {
    const type = request.params.Type;
    const identifier = request.params.ID;
    try {
      const participant = await participants.getParticipantsByTypeAndID(type, identifier)
      return h.response(participant)
    } catch (e) {
      console.log(e)
      throw e
    }

  
  },
  /**
   * summary: Return participant information
   * description: The PUT /participants/{Type}/{ID} is used to update information in the server regarding the provided identity, defined by {Type} and {ID} (for example, PUT /participants/MSISDN/123456789).
   * parameters: Type, ID, content-type, date, fspiop-source, body, accept, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
   * produces: application/json
   * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
   */
  put: async function ParticipantsByTypeAndIDPut (request, h) {


    let fspId = request.payload.fspId;
    let currency = request.payload.currency; 


    try {
      const participant = await participants.updateParticipant(fspId,currency)


      if(typeof participant.errorInformation !== 'undefined' && participant.errorInformation !== null) return h.response(participant).code(participant.errorInformation.errorCode)
      return h.response(participant).code(200)

    } catch (e) {
      console.log(e)
      throw e
    }
   },
  /**
   * summary: Create participant information
   * description: The HTTP request POST /participants/{Type}/{ID} is used to create information in the server regarding the provided identity, defined by {Type} and {ID} (for example, POST /participants/MSISDN/123456789).
   * parameters: accept, Type, ID, content-type, date, fspiop-source, body, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method, content-length
   * produces: application/json
   * responses: 201, 400, 401, 403, 404, 405, 406, 501, 503
   */
  post: async function ParticipantsByTypeAndIDPost (request, h) {

    let fspId = request.payload.fspId;
    let currency = request.payload.currency; 


    try {
      const participant = await participants.createParticipant(fspId,currency)


      if(typeof participant.errorInformation !== 'undefined' && participant.errorInformation !== null) return h.response(participant).code(participant.errorInformation.errorCode)
      return h.response(participant).code(201)

    } catch (e) {
      console.log(e)
      throw e
    }

  },
  /**
   * summary: Delete participant information
   * description: The HTTP request DELETE /participants/{Type}/{ID} is used to delete information in the server regarding the provided identity, defined by {Type} and {ID}) (for example, DELETE /participants/MSISDN/123456789). This HTTP request should support a query string to delete FSP information regarding a specific currency only (This similarly applies to the SubId). To delete a specific currency only, the HTTP request DELETE /participants/{Type}/{ID}?currency=XYZ should be used, where XYZ is the requested currency. Note - Both the currency and the SubId can be used mutually inclusive or exclusive
   * parameters: accept, Type, ID, Currency, SubId, content-type, date, fspiop-source, x-forwarded-for, fspiop-destination, fspiop-encryption, fspiop-signature, fspiop-uri, fspiop-http-method
   * produces: application/json
   * responses: 204, 400, 401, 403, 404, 405, 406, 501, 503
   */
  delete: async function ParticipantsByTypeAndIDDelete (request, h) {

  
    const identifier = request.params.ID;
    try {
      const participant = await participants.deleteParticipant(identifier)
      return h.response(participant)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
