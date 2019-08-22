const path = require("path")
// database
// mongo
const { CreateMongoConnection } = require(path.join(__dirname, '/src/infrastructure/mongodb'))
// creating mongo connection
CreateMongoConnection()

// Repositories
const RecordRepository = require(path.join(__dirname, '/src/domain/repository/recordRepository'))
const MongoRecordRepository = require(path.join(__dirname, '/src/infrastructure/repository/mongo/recordRepository'))

// Services
const RecordService = require(path.join(__dirname, '/src/service/recordService'))

// Handlers
const RecordHandler = require(path.join(__dirname, '/src/handler/recordHandler'))

// ExpressApp to serve
const ExpressApp = require(path.join(__dirname, '/src/infrastructure/server/express'))

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
