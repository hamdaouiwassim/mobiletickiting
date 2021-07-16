const User = require('../models/UserModel')
const Partenaire = require('../Models/PartenaireModel')
const Client = require('../Models/ClientModel')
const Admin = require('../Models/AdministrateurModel')
const Category = require('../Models/CategorieModel')
const Event = require('../Models/EventModel')
const Reservation = require('../Models/ReservationModel')

exports.getMyEvents = (req,res) => {
    Event.find({partenaire : req.params.id }).populate('event').then(events=>{
        return res.status(200).json(events);
    }).catch(err=>{
        return res.json(err);
    })
}


exports.reservations = (req,res) => {
    Reservation.find({}).then(reservations=>{
        return res.status(200).json(reservations);
    }).catch(err=>{
        return res.json(err);
    })
}



exports.AddEvent = (req,res,next) => {
console.log(req.files)
    const event = new Event({
        nom :  req.body.nom,
        image : req.file.filename,
        description :req.body.description,
        categerie : req.body.categorie,
        nbrstd : req.body.nbrstd ,
        nbrprm : req.body.nbrprm ,
        prixstd : req.body.prixstd ,
        prixprm : req.body.prixprm ,
        date :  req.body.date,
        heure :  req.body.heure,
        partenaire : req.body.partenaire
    });


    event.save().then(event=>{
        return res.status(200).json(event);
    }).catch(err=>{
        return res.json(err);
    })
}


exports.deleteEvent = (req,res,next) => {

    
        Event.findByIdAndRemove(req.params.id).then(event=>{
            return res.status(200).json(event);
        }).catch(err=>{
            return res.json(err);
        })
}