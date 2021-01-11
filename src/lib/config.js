'use strict'

const RC = require('parse-strings-in-object')(require('rc')('ES', require('../../config/default.json')))

module.exports = {
  PORT: RC.PORT,
  HOSTNAME: RC.HOSTNAME,
  DATABASE_URI: RC.DATABASE_URI,
  HUB_PARTICIPANT: RC.HUB_PARTICIPANT
}
