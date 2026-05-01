const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Use SQLite for development, PostgreSQL for production
const isDev = process.env.NODE_ENV !== 'production';

let authRoutes, dataRoutes;
if (isDev) {
  const { register, login } = require('./controllers/authController-sqlite');
  const dataController = require('./controllers/dataController-sqlite');

  const router = require('express').Router();
  router.post('/register', register);
  router.post('/login', login);
  authRoutes = router;

  const dataRouter = require('express').Router();
  const { verifyToken } = require('./middleware/auth');
  dataRouter.use(verifyToken);
  dataRouter.get('/prestations', dataController.getPrestations);
  dataRouter.post('/prestations', dataController.createPrestation);
  dataRouter.put('/prestations/:id', dataController.updatePrestation);
  dataRouter.delete('/prestations/:id', dataController.deletePrestation);
  dataRouter.get('/clinical', dataController.getClinicalRecords);
  dataRouter.post('/clinical', dataController.saveClinicalRecord);
  dataRouter.get('/documents', dataController.getReferenceDocuments);
  dataRouter.post('/documents', dataController.uploadDocument);
  dataRouter.delete('/documents/:id', dataController.deleteDocument);
  dataRoutes = dataRouter;
} else {
  authRoutes = require('./routes/auth');
  dataRoutes = require('./routes/data');
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
