
const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: String,
        default: false,
        trim: true,
    },
},{
    timestamps: { 
        updatedAt: 'timestamp',
        currentTime: () => Date.now()
    }
})

const ObjectModel = mongoose.model('Object',objectSchema)

module.exports = ObjectModel