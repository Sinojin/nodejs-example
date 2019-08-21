
// database
// mongo
const { CreateMongoConnection } = require('./src/infrastructure/mongodb')
// creating mongo connection
CreateMongoConnection()

// Repositories
const RecordRepository = require('./src/domain/repository/recordRepository')
const MongoRecordRepository = require('./src/infrastructure/repository/mongo/recordRepository')

// Services
const RecordService = require('./src/service/recordService')

// Handlers
const RecordHandler = require('./src/handler/recordHandler')

// ExpressApp to serve
const ExpressApp = require('./src/infrastructure/server/express')

/* =============== Instances ==================== */

// record repository instance
const mongoRecordRepository = new MongoRecordRepository()
const recordRepository = new RecordRepository(mongoRecordRepository)

// record service
const recordservice = new RecordService(recordRepository)

// record handler
const recordHandler = new RecordHandler(recordservice)

const server = new ExpressApp(recordHandler)

server.start()
