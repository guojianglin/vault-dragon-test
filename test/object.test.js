const request = require('supertest')
const { resource, post } = require('../src/app')
const app = require('../src/app')
const ObjectModel = require('../src/models/object')

const object = {
    key: 'testKey',
    value: 'testValue'
}
const object2 = {
    'testKey': 'testValueUpdated'
}
const object3 = {
    'testKey': 'thirdValueThired'
}

 beforeEach(async () => {
    await ObjectModel.deleteMany()
    await new ObjectModel(object).save()
 })
test('Testing post object endPoint.', async () => {
    await request(app).post('/vault-test/object').send(object).expect(201)
})

test('Testing get object value by key name.', async () => {
    await request(app).get(`/vault-test/object/${object.key}`)
    .expect(200)
    .expect({value: object.value})
})

test('Testing get lastest object value by key name.', async () => {
    await request(app).post('/vault-test/object').send(object2)
    await request(app).get(`/vault-test/object/${object.key}`)
    .expect(200)
    .expect({value: Object.values(object2)[0]})
})

test('Testing get object value by key name while filtering by timestamp', async () => {
    const response2 = await request(app).post('/vault-test/object').send(object2)
    const timestamp2 = response2.body['timestamp'] + 2
    console.log('timestamp2 === ', timestamp2)
    console.log('response2 body === ', response2.body)

    const response3 = await request(app).post('/vault-test/object').send(object3)
    const timestamp3 = response3.body['timestamp'] + 2
    await request(app).get(`/vault-test/object/${object.key}?timestamp=${timestamp2}`)
    .expect(200)
    .expect({
        value: response2.body.value
    })
    await request(app).get(`/vault-test/object/${object.key}?timestamp=${timestamp3}`)
    .expect(200)
    .expect({
        value: response3.body.value
    })
})
