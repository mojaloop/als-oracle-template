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
const Logger = require('@mojaloop/central-services-shared').Logger
const ParticipantsService = require('../../../../src/domain/participants')
const ParticipantsModel = require('../../../../src/models/participants')


Test('ParticipantsService', async (ParticipantsServiceTest) => {
  let sandbox

  ParticipantsServiceTest.beforeEach(test => {
    sandbox = Sinon.createSandbox()
    test.end()
  })

  ParticipantsServiceTest.afterEach(test => {
    sandbox.restore()
    test.end()
  })

  await ParticipantsServiceTest.test('getParticipantsByTypeAndID should', async getParticipantsByTypeAndIDTest => {
    try {
      const type = 'bankAccount'
      const identifier = '00419876543219'
      const options = {
        logger: Logger
      }
      const ParticipantsMock = {
        "partyList": [
          {
            "fspId": "001",
            "currency": "TZS",
            "partySubIdOrType": ""
          }
        ]
      }

    
      await getParticipantsByTypeAndIDTest.test('return party list', async test => {
        try {
          
          const getStub = {
            default: sandbox.stub().resolves(ParticipantsMock)
        }
        
        const modelStub = {
            get: sandbox.stub().returns(getStub)
        }
        
       // sandbox.stub(ParticipantsMock).returns(modelStub)
       ParticipantsModel.get = sandbox.stub()
       ParticipantsModel.get.returns(getStub)
       // ParticipantsModel.returns(modelStub)

         // sandbox.stub(ParticipantsModel.get, 'default').resolves(ParticipantsMock)
        //  ParticipantsModel.getParticipantsByTypeAndID = sandbox.stub().returns(ParticipantsMock)
          let result = await ParticipantsService.getParticipantsByTypeAndID(type, identifier, options)
          test.ok(result, 'Result returned')
          test.ok(SettlementModel.getById.withArgs(type, identifier).calledOnce, 'SettlementModel.getById with args ... called once')
           test.end()
        } catch (err) {
          Logger.error(`getParticipantsByTypeAndIDTest failed with error - ${err}`)
          test.fail()
          test.end()
        }
      })

      // await getParticipantsByTypeAndIDTest.test('throw', async test => {
      //   try {
      //     SettlementModel.settlementParticipantCurrency.getParticipantCurrencyBySettlementId = sandbox.stub()
      //     await ParticipantsService.getParticipantsByTypeAndID({ settlementId }, enums)
      //     test.fail('Error not thrown!')
      //     test.end()
      //   } catch (err) {
      //     Logger.error(`getByIdTest failed with error - ${err}`)
      //     test.equal(err.message, 'participantCurrenciesList is not iterable', `Error "${err.message}" thrown`)
      //     test.end()
      //   }
      // })

      // await getParticipantsByTypeAndIDTest.test('throw', async test => {
      //   try {
      //     SettlementModel.getById = sandbox.stub()
      //     await ParticipantsService.getParticipantsByTypeAndID({ settlementId }, enums, options)
      //     test.fail('Error not thrown!')
      //     test.end()
      //   } catch (err) {
      //     Logger.error(`getByIdTest failed with error - ${err}`)
      //     test.equal(err.message, '2001 TODO Settlement not found', `Error "${err.message}" thrown`)
      //     test.end()
      //   }
      // })

      await getParticipantsByTypeAndIDTest.end()
    } catch (err) {
      Logger.error(`ParticipantsServiceTest failed with error - ${err}`)
      getParticipantsByTypeAndIDTest.fail()
      getParticipantsByTypeAndIDTest.end()
    }
  })

  await ParticipantsServiceTest.end()
})
