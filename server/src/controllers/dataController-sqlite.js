const db = require('../config/database-sqlite');

// Prestations
const getPrestations = async (req, res) => {
  db.all(
    'SELECT * FROM prestations WHERE user_id = ? ORDER BY created_at DESC',
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch prestations' });
      res.json(rows || []);
    }
  );
};

const createPrestation = async (req, res) => {
  const { prestation, client, montant, date } = req.body;
  db.run(
    'INSERT INTO prestations (user_id, prestation, client, montant, date) VALUES (?, ?, ?, ?, ?)',
    [req.userId, prestation, client, montant, date || new Date().toISOString()],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create prestation' });
      res.status(201).json({
        id: this.lastID,
        user_id: req.userId,
        prestation,
        client,
        montant,
        date: date || new Date().toISOString()
      });
    }
  );
};

const updatePrestation = async (req, res) => {
  const { id } = req.params;
  const { prestation, client, montant } = req.body;
  db.run(
    'UPDATE prestations SET prestation=?, client=?, montant=? WHERE id=? AND user_id=?',
    [prestation, client, montant, id, req.userId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to update prestation' });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ id, prestation, client, montant });
    }
  );
};

const deletePrestation = async (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM prestations WHERE id=? AND user_id=?',
    [id, req.userId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to delete prestation' });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ deleted: true });
    }
  );
};

// Clinical records
const getClinicalRecords = async (req, res) => {
  db.all(
    'SELECT * FROM clinical_records WHERE user_id = ? ORDER BY created_at DESC',
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch clinical records' });
      res.json(rows || []);
    }
  );
};

const saveClinicalRecord = async (req, res) => {
  const { client_id, data } = req.body;
  db.run(
    'INSERT INTO clinical_records (user_id, client_id, data) VALUES (?, ?, ?)',
    [req.userId, client_id, JSON.stringify(data)],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to save clinical record' });
      res.status(201).json({
        id: this.lastID,
        user_id: req.userId,
        client_id,
        data
      });
    }
  );
};

// Reference documents
const getReferenceDocuments = async (req, res) => {
  db.all(
    'SELECT id, filename, size, uploaded_at FROM reference_documents WHERE user_id = ? ORDER BY uploaded_at DESC',
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch documents' });
      res.json(rows || []);
    }
  );
};

const uploadDocument = async (req, res) => {
  const { filename, data } = req.body;
  db.run(
    'INSERT INTO reference_documents (user_id, filename, data) VALUES (?, ?, ?)',
    [req.userId, filename, data],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to upload document' });
      res.status(201).json({ id: this.lastID, filename });
    }
  );
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  db.run(
    'DELETE FROM reference_documents WHERE id=? AND user_id=?',
    [id, req.userId],
    function(err) {
      if (err) return res.status(500).json({ error: 'Failed to delete document' });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ deleted: true });
    }
  );
};

module.exports = {
  getPrestations, createPrestation, updatePrestation, deletePrestation,
  getClinicalRecords, saveClinicalRecord,
  getReferenceDocuments, uploadDocument, deleteDocument
};
