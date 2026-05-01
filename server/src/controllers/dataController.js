const pool = require('../config/database');

// Prestations (devis/factures)
const getPrestations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM prestations WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching prestations:', err);
    res.status(500).json({ error: 'Failed to fetch prestations' });
  }
};

const createPrestation = async (req, res) => {
  const { prestation, client, montant, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO prestations (user_id, prestation, client, montant, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.userId, prestation, client, montant, date || new Date()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating prestation:', err);
    res.status(500).json({ error: 'Failed to create prestation' });
  }
};

const updatePrestation = async (req, res) => {
  const { id } = req.params;
  const { prestation, client, montant } = req.body;
  try {
    const result = await pool.query(
      'UPDATE prestations SET prestation=$1, client=$2, montant=$3 WHERE id=$4 AND user_id=$5 RETURNING *',
      [prestation, client, montant, id, req.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating prestation:', err);
    res.status(500).json({ error: 'Failed to update prestation' });
  }
};

const deletePrestation = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM prestations WHERE id=$1 AND user_id=$2 RETURNING id',
      [id, req.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    console.error('Error deleting prestation:', err);
    res.status(500).json({ error: 'Failed to delete prestation' });
  }
};

// Clinical records
const getClinicalRecords = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM clinical_records WHERE user_id = $1 ORDER BY created_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching clinical records:', err);
    res.status(500).json({ error: 'Failed to fetch clinical records' });
  }
};

const saveClinicalRecord = async (req, res) => {
  const { client_id, data } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO clinical_records (user_id, client_id, data) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, client_id, JSON.stringify(data)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saving clinical record:', err);
    res.status(500).json({ error: 'Failed to save clinical record' });
  }
};

// Reference documents
const getReferenceDocuments = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, filename, size, uploaded_at FROM reference_documents WHERE user_id = $1 ORDER BY uploaded_at DESC',
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

const uploadDocument = async (req, res) => {
  const { filename, data } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reference_documents (user_id, filename, data) VALUES ($1, $2, $3) RETURNING id, filename',
      [req.userId, filename, data]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error uploading document:', err);
    res.status(500).json({ error: 'Failed to upload document' });
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM reference_documents WHERE id=$1 AND user_id=$2 RETURNING id',
      [id, req.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};

module.exports = {
  getPrestations, createPrestation, updatePrestation, deletePrestation,
  getClinicalRecords, saveClinicalRecord,
  getReferenceDocuments, uploadDocument, deleteDocument
};
