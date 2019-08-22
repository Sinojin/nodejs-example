/* eslint-disable prefer-const */
// This class is implemented for mongo

var mongoose = require('mongoose')
var RecordDomain = require('../../../domain/record')

var RecordSchema = new mongoose.Schema({
  key: String,
  value: String,
  createdAt: Date,
  counts: [Number]
})

class RecordRepository {
  constructor () {
    // record = mongoose.model('records', RecordSchema)
    this.record = mongoose.model('records', RecordSchema)
  }

  async getRecordsBy (startDate, endDate, minCount, maxCount) {
    let records = await this.record.aggregate([
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
      { $project: { _id: 0, key: 1, createdAt: 1, totalCount: { $sum: '$counts' } } },
      { $match: { totalCount: { $gte: minCount, $lt: maxCount } } }
    ]
    ).exec()
      .then(res => {
        let recordList = []
        res.forEach(record => {
          let recordElement = new RecordDomain(record.key, record.createdAt, record.totalCount)
          recordList.push(recordElement)
        })
        return recordList
      })
      .catch(err => { throw err })
    return records
  }
}

module.exports = RecordRepository
