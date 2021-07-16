const mongoose = require('mongoose');
const ReservationSchema = mongoose.Schema({
  
    etat : {
        type : String ,
        enum : ['non payee','payee'] ,
        default : 'non payee',
    },
    nbrtickets: {
        type : Number, 
        
    },
    typeticket: {
        type : String ,
        enum : ['standard','premium'] ,
    },
    event: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'evenements'
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
  

})

module.exports = mongoose.model('reservations',ReservationSchema)