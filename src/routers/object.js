const express = require('express')
const router = new express.Router()
const objectController = require('../controllers/object')

router.get('/', (req, res) => {
    res.send('hi, this is a default response to call in browser')
})

router.post('/object', objectController.saveObject)
router.get('/object/:key', objectController.getObject)


module.exports = router
