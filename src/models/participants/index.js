'use strict'

const Facade = require('./facade')
const Configuration = require('../configuration')

module.exports = {
  getByParticipantId: Facade.getByParticipantId,
  createParticipant: Facade.createParticipant,
  updateByParticipantId: Facade.updateByParticipantId,
  deleteByParticipantId: Facade.deleteByParticipantId,
  getConfiguration: Configuration.getConfiguration
      }
