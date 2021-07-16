const mongoose = require('mongoose');
const PartenaireSchema = mongoose.Schema({
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
    categorie : {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'categories'
       
    },
    user: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
  

})

module.exports = mongoose.model('partenaires',PartenaireSchema)