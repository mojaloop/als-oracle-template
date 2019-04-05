/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * Georgi Georgiev <georgi.georgiev@modusbox.com>
 * Valentin Genev <valentin.genev@modusbox.com>
 --------------
 ******/

'use strict'

const Test = require('tapes')(require('tape'))
const Sinon = require('sinon')
// const Db = require('../../../src/models')
const Db = require('@mojaloop/central-services-database').Db
const Logger = require('@mojaloop/central-services-shared').Logger
const ParticipanrFacade = require('../../../src/models/participants/facade')

Logger.error('this is error')

Test('Settlement Window facade', async (ParticipanrFacadeTest) => {
  let sandbox
  let builderStub
  let selectStub
  let whereStub
  let andWhereStub
  let selectStubResult

     ParticipanrFacadeTest.beforeEach(test => {
    sandbox = Sinon.createSandbox()
    Db.participant = {
      query: sandbox.stub()
    }
 
    builderStub = sandbox.stub()
    Db.participant.query.callsArgWith(0, builderStub)
    builderStub.join = sandbox.stub()
    selectStub = sandbox.stub()
    whereStub = sandbox.stub()
    andWhereStub = sandbox.stub()

    selectStubResult = {
      where: whereStub.returns({
        andWhere: andWhereStub
      })
    }
    
    builderStub.join.returns({
      select: selectStub.returns(selectStubResult)
    })
    test.end()
  })

  ParticipanrFacadeTest.afterEach(test => {
    sandbox.restore()
    test.end()
  })

  await ParticipanrFacadeTest.test('getById should', async getByParticipantId => {
    try {
      const participantId = 111

      
      const participantResultStub = {
        "partyList": [
          {
            "fspId": "001",
            "currency": "TZS",
            "partySubIdOrType": ""
          }
        ]
      }
      let e

      await getByParticipantId.test('retrieve settlement window data by id', async test => {
        try {
          Db.participant.query.returns(Promise.resolve(participantResultStub))

          let result = await ParticipanrFacade.getByParticipantId(participantId )
          test.ok(result, 'Result returned')
          test.ok(builderStub.join.withArgs('currencyParticipant','participant.name','currencyParticipant.participantId').calledOnce)
          test.ok(selectStub.withArgs('participant.name AS fspId','currencyParticipant.currencyId AS currency').calledOnce)
          test.ok(whereStub.withArgs('participant.name', participantId).calledOnce)
          test.ok(andWhereStub.withArgs('participant.isActive', 1).calledOnce)
          test.end()
        } catch (err) {
          Logger.error(`getById failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })
 //   await getByParticipantId.test('throw error if database is unavailable', async test => {
    //     try {
    //       e = new Error('Database unavailable')
    //       Db.settlementWindow.query.throws(e)

    //       await SettlementWindowFacade.getById({ participantId })
    //       test.fail('Error not thrown!')
    //       test.end()
    //     } catch (err) {
    //       Logger.error(`getById failed with error - ${err}`)
    //       test.equal(err.message, e.message, `Error "${err.message}" thrown as expected`)
    //       test.end()
    //     }
    //   })
   

      await getByParticipantId.end()
    } catch (err) {
      Logger.error(`participantFacadeTest failed with error - ${err}`)
      getByParticipantId.fail()
      getByParticipantId.end()
    }
  })

 



  ParticipanrFacadeTest.end()
})
