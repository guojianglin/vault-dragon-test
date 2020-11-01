const express = require('express')
const router = new express.Router()
const objectController = require('../controllers/object')

router.get('/vault-test/', (req, res) => {
    res.send('hi, this is a default response to call in browser')
})

router.post('/vault-test/object', objectController.saveObject)
router.get('/vault-test/object/:key', objectController.getObject)


module.exports = router
