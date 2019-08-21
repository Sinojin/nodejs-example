// express framework configuration will be here
// this class will bootstraps express and it mounts handlers

const express = require('express')
const bodyParser = require('body-parser')
const { CustomError } = require('./../error/custom')
const router = express.Router()
const app = express()
const port = process.env.PORT || 3000

// todo:it can be much better !

class ExpressServer {
  constructor (RecordHandler) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    router.post('/records', wrapAsync(RecordHandler.getRecordsByDateAndLimit))
    app.use('/v1', router)
    app.use(errorMiddleware)
  }

  start () {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
  }
}

function wrapAsync (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}
function errorMiddleware (error, req, res, next) {
  if (!(error instanceof CustomError)) {
    error.code = 999
  }
  res.status(200).json({ msg: error.message, code: error.code, records: [] })
}

module.exports = ExpressServer
