// Custom error created beacuse we need error code and general Error class doesn't support it.

const RecordNotFound = 'Record not found !'
const RecordNotFoundCode = 100

const InvalidRecordBody = 'Invalid Body !'
const InvalidRecordBodyCode = 101

class CustomError extends Error {
  constructor (message, Code) {
    super(message)
    this.code = Code
  }
}

module.exports = {
  CustomError,
  RecordNotFound: () => new CustomError(RecordNotFound, RecordNotFoundCode),
  InvalidRecordBody: () => new CustomError(InvalidRecordBody, InvalidRecordBodyCode)
}
