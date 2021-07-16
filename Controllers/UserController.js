const User = require('../models/UserModel')
const Partenaire = require('../Models/PartenaireModel')
const Client = require('../Models/ClientModel')
const Admin = require('../Models/AdministrateurModel')
const Reservation = require('../Models/ReservationModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const Event = require('../Models/EventModel')

exports.getAll = (req,res) => {
    User.find({}).then(users=>{
        return res.status(200).json(users);
    }).catch(err=>{
        return res.json(err);
    })
}


exports.getClients = (req,res) => {
    Client.find({}).populate('user').then(clients=>{
        return res.status(200).json(clients);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.ChangeActive = (req,res) => {
    User.findById(req.params.id).then(user=>{
        if ( user.active == 0 ){
            User.findByIdAndUpdate(user._id,{ 'active' : 1 }).then(user=>{
                return res.status(200).json({'message' : 'changed'});
            }).catch(err=>{
                return res.status(400).json(err);
            })
        }else{
            User.findByIdAndUpdate(user._id,{ 'active' : 0 }).then(user=>{
                return res.status(200).json({'message' : 'changed'});
            }).catch(err=>{
                return res.status(400).json(err);
            }) 
        }
    }).catch(err=>{
        return res.json(err);
    })
}

exports.getPartenaires = (req,res) => {
    Partenaire.find({}).populate('user').then(partenaires=>{
        return res.status(200).json(partenaires);
    }).catch(err=>{
        return res.json(err);
    })
}

exports.DeleteUser = (req,res) => {


    User.findByIdAndRemove(req.params.id).then(data=>{   
        if (data.role == "Partenaire"){
            Partenaire.findOneAndRemove({'user': data._id},(res,err)=>{
                if(res){console.log(res);}
            });
        }else if (data.role == "Client"){
            console.log(data._id)
            Client.findOneAndRemove({'user': data._id},(res,err)=>{
                if(res){console.log(res);}
            });
        }else{
            Admin.findOneAndRemove({'user': data._id},(res,err)=>{
                if(res){console.log(res);}
            });
        } 
        return res.status(200).json(data);
    }).catch(err=>{
        return res.json(err);
    })
}





exports.signup = (req,res) => {
   
    User.findOne({
        email : req.body.email            
    }).exec( (error,user) => {
        if (user ) return res.status(400).json({
            message : 'User already registred'
        })
      
        const _user = new User({
            username : req.body.username, 
            role : req.body.role,
            email : req.body.email,
            password :req.body.password 
            
        });
        _user.save((error,data) => {
            if(error){
                return res.status(400).json({
                    message : "Something went wrong"
                });

            }
            if(data){
                // ADD  ROLE USER
                if(req.body.role == "Partenaire"){
                    const partenaire = new Partenaire({
                        nom : ' ' ,
                        prenom : ' ' ,
                        user : data._id ,
                        adresse : ' ' ,
                        telephone : ' ' ,
                        image : ' ' ,
                        categorie : null
                    });
                    partenaire.save((error,data) => {
                        if (error) return res.status(400).json(error)
                        if(data){
                            return res.status(201).json({
                                message : "User created successfully ...!"
                            })
                        }
                    })

                }else if(req.body.role == "Admin"){
                    const admin = new Admin({
                        nom : ' ' ,
                        prenom : ' ' ,
                        user : data._id ,
                        adresse : ' ' ,
                        telephone : ' ' ,
                        image : ' ' ,
                    });
                    admin.save((error,data) => {
                        if (error) return res.status(400).json(error)
                        if(data){
                            return res.status(201).json({
                                message : "User created successfully ...!"
                            })
                        }
                    })
                }else{
                    const client = new Client({
                        nom : ' ' ,
                        prenom : ' ' ,
                        user : data._id ,
                        adresse : ' ' ,
                        telephone : ' ' ,
                        image : ' ' ,
                    });
                    client.save((error,data) => {
                        if (error) return res.status(400).json(error)
                        if(data){
                            return res.status(201).json({
                                message : "User created successfully ...!"
                            })
                        }
                    })
                }
                
                
            }
        })


    }) // add user 
}

exports.signin = (req,res) => {
    User.findOne({
        email : req.body.email            
    }).exec((error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
         
           
                user.authenticate(req.body.password).then( 
                    data => {
                        if(data){
                            const token = jwt.sign({ _id:user._id , role : user.role  },"secrets", { expiresIn : '1h'}) 
                            const { _id ,  username , email , role , active } = user;
                            //let relatedUserinfo = {};
                            if ( user.role == "Admin"){
                                 Admin.findOne({ user : user._id }).then(admin=>{
                                    res.status(200).json({
                                        token,
                                        user :{
                                            _id ,
                                            username ,
                                            email ,
                                            role ,
                                            active
                                        
                                        },
                                        relatedUser : admin 
                                    })
                                })

                            }else if( user.role == "Client"){
                                Client.findOne({ user : user._id }).then(client=>{ 
                                    res.status(200).json({
                                        token,
                                        user :{
                                            _id ,
                                            username ,
                                            email ,
                                            role ,
                                            active
                                        
                                        },
                                        relatedUser : client 
                                    })
                                })
                            }else{
                             Partenaire.findOne({ user : user._id }).then(part=>{ 
                                res.status(200).json({
                                    token,
                                    user :{
                                        _id ,
                                        username ,
                                        email ,
                                        role ,
                                        active
                                    
                                    },
                                    relatedUser : part 
                                })
                                })
                            }
                  
                           
                        }else{
                            return res.status(400).json({message : "Invalid password "}) 
                        }
                    
                            
                })
                    
                
                    
        }
        else{
            return res.status(400).json({ message : 'Something went wrong' })
        }
    })
}



exports.signinAdmin = (req,res) => {
    User.findOne({
        email : req.body.email }).exec((error,user)=>{
        if(error) return res.status(400).json({ error })
        if(user){
         
           
                user.authenticate(req.body.password).then( 
                    data => {
                        if(data){
                            const token = jwt.sign({ _id:user._id , role : user.role  },"secrets", { expiresIn : '1h'}) 
                            const { _id ,  username , email , role , active } = user;
                            //let relatedUserinfo = {};
                            //if ( user.role == "Admin"){
                                 Admin.findOne({ user : user._id }).then(admin=>{
                                    res.status(200).json({
                                        token,
                                        user :{
                                            _id ,
                                            username ,
                                            email ,
                                            role ,
                                            active
                                        
                                        },
                                        relatedUser : admin 
                                    })
                                })

                  
                           
                        }else{
                            return res.status(400).json({message : "Invalid password "}) 
                        }
                    
                            
                })
                    
                
                    
        }
        else{
            return res.status(400).json({ message : 'Something went wrong' })
        }
    })
}


exports.getPartenaireByUserId = (req,res,nex) => {
    Partenaire.find({ user : req.params.id }).then(partenaire => {
        return res.status(200).json(partenaire);
    }).catch(err=>{
        return res.status(400).json(err); 

    })

}

exports.getClientByUserId = (req,res,nex) => {
    Client.find({ user : req.params.id }).then(client => {
        return res.status(200).json(client);
    }).catch(err=>{
        return res.status(400).json(err); 

    })

}

exports.searchEvent = (req,res) =>{

    if ( req.params.search == " " ){ // mot vide 
        Event.find({}).then(events => {
            return res.status(200).json(events);
        }).catch(err=>{
            return res.status(400).json(err); 
    
        })
    }else{ // mot non  vide
         Event.find({ "nom": { $regex: '.*' + req.params.search + '.*' }}).then(events => {
            return res.status(200).json(events);
        }).catch(err=>{
            return res.status(400).json(err); 
    
        })
    }
  
}

exports.updateInfo = (req,res) => {
    console.log(req.params.id)
    User.findByIdAndUpdate(req.params.id,{email : req.body.email , username : req.body.username }). // only return the Persons name
    exec(function (err, user) {
        console.log(user);
        if (err) return  res.status(400).json(err);
        if (user){
                if ( user.role == "Admin" ){ // 'Admin','Client','Partenaire'
                    Admin.findOneAndUpdate({ user : user._id  },{ nom : req.body.nom, prenom :req.body.prenom , telephone : req.body.telephone}).exec(function (err, admin){
                        if (err) return  res.status(400).json(err);
                        if (admin){
                                return res.status(200).json(admin);
                        }
                    })
                }

                else if ( user.role == "Client" ){ // 'Admin','Client','Partenaire'
                    Client.findOneAndUpdate({ user : user._id  },{ nom : req.body.nom, prenom :req.body.prenom , telephone : req.body.telephone}).exec(function (err, client){
                        if (err) return  res.status(400).json(err);
                        if (client){
                                return res.status(200).json(client);
                        }
                    })
                }

                else { // 'Admin','Client','Partenaire'
                    Partenaire.findOneAndUpdate({ user : user._id  },{ nom : req.body.nom, prenom :req.body.prenom , telephone : req.body.telephone}).exec(function (err, partenaire){
                        if (err) return  res.status(400).json(err);
                        if (partenaire){
                                return res.status(200).json(partenaire);
                        }
                    })
                }
        }

   
    });
   
}

exports.AddReservation = (req,res) => {
    console.log(req.body);
        const r = new Reservation({
            user : req.body.user,
            event : req.body.event,
            nbrtickets : req.body.nbrtickets,
            typeticket : req.body.typeticket,  
        })
        r.save().then(res=>{
            return res.status(200).json(res);
        }).catch(err=>{
            return res.json(err);
        })


}

exports.PayeReservation = (req,res) => {
  
    Reservation.findByIdAndUpdate( req.params.id, { etat : 'payee' }).then(res=>{
        return res.status(200).json(res);
    }).catch(err=>{
         return res.json(err);
    })


}