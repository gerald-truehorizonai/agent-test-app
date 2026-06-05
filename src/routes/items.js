const express = require('express');
const store = require('../store');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(store.getAll());
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const item = store.create({ name, description });
  res.status(201).json(item);
});

router.get('/:id', (req, res) => {
  const item = store.getById(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'item not found' });
  }
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const deleted = store.deleteById(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'item not found' });
  }
  res.status(204).send();
});

router.put('/:id', (req, res) => {
  const { name, description } = req.body;

  if (name === undefined && description === undefined) {
    return res.status(400).json({ error: 'name or description is required' });
  }

  if (name === '') {
    return res.status(400).json({ error: 'name cannot be empty' });
  }

  const fields = {};
  if (name !== undefined) fields.name = name;
  if (description !== undefined) fields.description = description;

  const item = store.update(req.params.id, fields);
  if (!item) {
    return res.status(404).json({ error: 'item not found' });
  }

  res.json(item);
});

module.exports = router;
