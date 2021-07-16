const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    nom : {
        type : String ,
 
    },
    prenom : {
        type : String ,
 
    },
    telephone : {
        type : String ,
 
    },
    adresse : {
        type : String ,
 
    },
    image : {
        type : String ,
 
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
  

})

module.exports = mongoose.model('admins',AdminSchema)