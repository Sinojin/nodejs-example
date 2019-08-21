const { MockFilledRecordRepository, MockEmptyRecordRepository } = require('./../../infrastructure/repository/__mock__/recordRepository')
// Services
const RecordService = require('./../../service/recordService')
const mockFilledRepo = new MockFilledRecordRepository()
const mockEmptyrepo = new MockEmptyRecordRepository()


describe('Record Service', () => {
    it('will find only one record', async (done) => {
        try {
            const recordservice = new RecordService(mockFilledRepo)
            const record = await recordservice.getRecordsByDateAndLimit(null,null,null,null)
            expect(record.length).toBe(1)
            done()
        } catch (error) {
            done.fail(error)
        }
    })

    it('will find no record', async (done) => {
        try {
            const recordservice = new RecordService(mockEmptyrepo)
            await recordservice.getRecordsByDateAndLimit(null,null,null,null)
        } catch (error) {
            expect(error.code).toBe(100)
            done()
        }
        
    })
})
