
var express = require('express');
var router = express.Router();
const PartenaireController = require('../controllers/PartenaireController')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


router.get('/:id/events', PartenaireController.getMyEvents )
router.get('/reservations', PartenaireController.reservations )
router.post('/event/add', upload.single('image') ,PartenaireController.AddEvent )
router.get('/event/:id/delete' ,PartenaireController.deleteEvent )

module.exports = router;