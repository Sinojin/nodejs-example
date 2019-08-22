/* eslint-disable prefer-const */
// this class contains handler functions.
const customError = require('./../infrastructure/error/custom')
const Moment = require('moment')
// fixme: must be global handler thing i think ?
var RecordService = null

class RecordResponseData {
  constructor (records) {
    this.code = 0
    this.msg = 'Success'
    this.records = records
  }
}

class RecordHandler {
  constructor (recordService) {
    RecordService = recordService
  }

  async getRecordsByDateAndLimit (req, res, next) {
    const { startDate, endDate, minCount, maxCount } = req.body
    if (!startDate || !endDate || !minCount || !maxCount) {
      throw customError.InvalidRecordBody()
    }
    let format = [
      Moment.ISO_8601,
      'YYYY-DD-MM'
    ]

    let startDateType = new Moment(startDate, format, true)
    let endDateType = new Moment(endDate, format, true)

    if (!startDateType.isValid() || !endDateType.isValid()) {
      throw customError.InvalidRecordBody()
    }

    const Records = await RecordService.getRecordsByDateAndLimit(startDateType.toDate(), endDateType.toDate(), minCount, maxCount)
    const ResponseData = new RecordResponseData(Records)

    res.json(ResponseData)
  }
}

module.exports = RecordHandler
