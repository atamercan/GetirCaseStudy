const mongoose = require('mongoose'); //importing mongoose

//creating a schema for using datas on the database
const PostSchema = mongoose.Schema({

//creating data variables and their own types, required for not to allow blanking, its optional   
    startDate: {
        type: Date,
        //required: true
    },
    endDate: {
        type: Date,
        //required: true
    },
    minCount: {
        type: Number,
        //required: true
    },
    maxCount: {
        type: Number,
        //required: true
    },
    key: {
        type: String
        //required: true
    },
    createdAt: {
        type: Date,
        default: Date.now //For not entered any value, it declared at to the moment's time
    },
    totalCount: {
        type: Number
        //required: true
    }
});

module.exports = mongoose.model('Posts', PostSchema); //export for sending these values to use