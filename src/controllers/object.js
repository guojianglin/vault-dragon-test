const ObjectModel = require('../models/object')

module.exports = {
    saveObject: async (req, res) => {
        try {
            let body = req.body
            const exist = await ObjectModel.findOne({key: Object.keys(body)[0], value: Object.values(body)[0]})
            if (exist) {
                return res.status(400).send({msg: 'Object has already exist!, think about another value please!'})
            }
            const object = new ObjectModel({
                key: Object.keys(body)[0], 
                value: Object.values(body)[0],
            })
            await object.save()
            const {key, value, timestamp} = object
            res.status(201).send({key, value, timestamp: timestamp.getTime()})
            
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getObject: async (req, res) => {
        try {
            let myKey = req.params.key
            let timestamp = req.query.timestamp
            let filter = {} 
            if (!timestamp){
                filter = {key: myKey}
            } else {
                // console.log(timestamp
                filter = {key: myKey, timestamp: {$lte: new Date(+timestamp)}}
            }
            const object = await ObjectModel.find(filter).sort({timestamp: 'desc'})
            if (!object.length) {
                return res.status(404).send()
            }
            res.send({value: object[0]['value']})
        } catch (error) {
            res.status(500).send(error)
        }
    }
}