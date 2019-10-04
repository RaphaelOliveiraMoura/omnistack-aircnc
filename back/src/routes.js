const router = require('express').Router();

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const multer = require('multer');
const uploadConfigurations = require('./config/upload');
const upload = multer(uploadConfigurations);

router.post('/sessions', SessionController.store);

router.post('/spots', upload.single('thumbnail'), SpotController.store);
router.get('/spots', SpotController.index);

router.get('/dashboard', DashboardController.show);

router.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = router;
