const User = require('../models/UserModel')
const Partenaire = require('../Models/PartenaireModel')
const Client = require('../Models/ClientModel')
const Admin = require('../Models/AdministrateurModel')
const Category = require('../Models/CategorieModel')
const Event = require('../Models/EventModel')

exports.AddCategorie = (req,res) => {
    
    const cat = new Category({
        nom : req.body.nom,
        description : req.body.description,
    });
    cat.save().then(categorie =>{
        return res.status(200).json(categorie)
    }).catch(err=> {
        return res.status(400).json(err)
    })
    // User.find({}).then(users=>{
    //     return res.status(200).json(users);
    // }).catch(err=>{
    //     return res.json(err);
    // })
}
exports.UpdateCategorie = (req,res) => {
    
    const data = {
        nom : req.body.nom,
        description : req.body.description,
    };
    Category.findByIdAndUpdate(req.body._id,data).then(categorie =>{
        return res.status(200).json(categorie)
    }).catch(err=> {
        return res.status(400).json(err)
    })
   
}
exports.DeleteCategorie = (req,res) => {
    Category.findByIdAndRemove(req.params.id).then(categorie =>{
        return res.status(200).json(categorie)
    }).catch(err=> {
        return res.status(400).json(err)
    })
   
}

exports.getAllCategories = (req,res) => {
    
   
    Category.find({}).then(users=>{
        return res.status(200).json(users);
    }).catch(err=>{
        return res.json(err);
    })
}


exports.getAllEvents = (req,res) => {
    Event.find({}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}



exports.getAllActiveEvents = (req,res) => {
    Event.find({ stat : 'active'}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}



exports.ActiveEvent = (req,res) => {
    Event.findByIdAndUpdate( req.params.id,{stat : 'active'}). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}
exports.getAllNonActiveEvents = (req,res) => {
    Event.find({ stat : 'non active'}).populate('categerie'). // only return the Persons name
    exec(function (err, events) {
        if (err) return  res.status(400).json(err);
        return res.status(200).json(events);
   
    });
   
}




