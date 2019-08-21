
var RecordDomain = require('../../../domain/Record')

class MockFilledRecordRepository {
  async getRecordsBy (startDate, endDate, minCount, maxCount) {
    let list = []
     list.push(new RecordDomain('lxVZlQjbT4ew9aRv', '2017-01-02T13:58:39.391Z', 4400))
     return list
  }
}

class MockEmptyRecordRepository {
  async getRecordsBy (startDate, endDate, minCount, maxCount) {
    return []
  }
}

module.exports = { MockFilledRecordRepository, MockEmptyRecordRepository }
