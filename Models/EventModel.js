const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    nom : {
        type : String ,
       
    },
    image : {
        type : String ,
       
    },
    description : {
        type : String ,
       
    },
    categerie : {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'categories'
       
    },
    
    nbrstd : {
        type : Number 
    },
    
    nbrprm : {
        type : Number 
    },
    prixstd : {
        type : Number 
    },
    prixprm : {
        type : Number 
    },
    date : {
        type : Date
    },
    heure : {
        type : String
    },
    partenaire :{
        type : mongoose.Schema.Types.ObjectId, 
        ref :'users'
    },
    stat : {
        type : String ,
        default : 'non active'
    }   
  
  

})

module.exports = mongoose.model('evenements',EventSchema)