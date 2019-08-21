// Business rules are implemented here for Records
const CustomError = require('./../infrastructure/error/custom')

// This service responsible for records business' jobs
class RecordService {
  constructor (RecordRepository) {
    this.recordRepository = RecordRepository
  }

  async getRecordsByDateAndLimit (startDate, endDate, minCount, maxCount) {
    const records = await this.recordRepository.getRecordsBy(startDate, endDate, minCount, maxCount)
    if (records.length === 0) {
      throw CustomError.RecordNotFound()
    }
    return records
  }
}

module.exports = RecordService
