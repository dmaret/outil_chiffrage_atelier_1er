const express = require('express');
const { verifyToken } = require('../middleware/auth');
const {
  getPrestations, createPrestation, updatePrestation, deletePrestation,
  getClinicalRecords, saveClinicalRecord,
  getReferenceDocuments, uploadDocument, deleteDocument
} = require('../controllers/dataController');

const router = express.Router();

router.use(verifyToken);

// Prestations
router.get('/prestations', getPrestations);
router.post('/prestations', createPrestation);
router.put('/prestations/:id', updatePrestation);
router.delete('/prestations/:id', deletePrestation);

// Clinical records
router.get('/clinical', getClinicalRecords);
router.post('/clinical', saveClinicalRecord);

// Reference documents
router.get('/documents', getReferenceDocuments);
router.post('/documents', uploadDocument);
router.delete('/documents/:id', deleteDocument);

module.exports = router;
