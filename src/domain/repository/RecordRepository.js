//  This Repository class define border for any database and It will be bridge to access data
// We can use this class like bridge and you can add new log or cache system into middle of real database and there is no code change will require

class RecordRepository {
  constructor (repository) {
    this.repository = repository
  }

  async getRecordsBy (startDate, endDate, minCount, maxCount) {
    return this.repository.getRecordsBy(startDate, endDate, minCount, maxCount)
  }
}

module.exports = RecordRepository
