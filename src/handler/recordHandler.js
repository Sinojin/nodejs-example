/* eslint-disable prefer-const */
// this class contains handler functions.
const customError = require('./../infrastructure/error/custom')

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
    let startDateType = new Date(startDate)
    let endDateType = new Date(endDate)

    const Records = await RecordService.getRecordsByDateAndLimit(startDateType, endDateType, minCount, maxCount)
    const ResponseData = new RecordResponseData(Records)

    res.json(ResponseData)
  }
}

module.exports = RecordHandler
