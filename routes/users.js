
var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController')
router.get('/getAll', UserController.getAll )
router.get('/clients', UserController.getClients )
router.get('/partenaires', UserController.getPartenaires )
router.get('/:id/active/change', UserController.ChangeActive )
router.get('/:id/delete', UserController.DeleteUser )
router.get('/client/:id', UserController.getClientByUserId )
router.get('/partenaire/:id', UserController.getPartenaireByUserId )
router.get('/events/:search', UserController.searchEvent )
router.post('/profile/:id/update', UserController.updateInfo )

router.post('/reservation/add', UserController.AddReservation )
router.post('/reservation/:id/update', UserController.PayeReservation )

module.exports = router;