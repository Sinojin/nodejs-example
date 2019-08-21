/* eslint-disable indent */
/* eslint-disable no-undef */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const MongoRecordRepository = require('./../../../../infrastructure/repository/mongo/recordRepository')

var mongoRecordRepository = null

describe('Get Records', () => {
    beforeAll(async (done) => {
        // creating mongo connection
        try {
            mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => done()).catch(error => { throw error })
            mongoRecordRepository = new MongoRecordRepository()
        } catch (err) {
            done.fail(err)
        }
    })
    it('with corrects number', (done) => {
        const repoRecords = async () => {
            const data = await mongoRecordRepository.getRecordsBy(new Date('2017-01-01'), new Date('2018-01-28'), 4400, 4500)
            expect(data.length).toBe(39)
            done()
        }
        repoRecords()
    })
    it('No sense limit', async (done) => {
        const repoRecords = async () => {
                data = await mongoRecordRepository.getRecordsBy('asdasd', 'asdasd', 'as', null)
                expect(data).toStrictEqual([])
                done()
        }
        repoRecords()
    })
})
