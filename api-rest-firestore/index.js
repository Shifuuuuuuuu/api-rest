const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Importar la clave de servicio de Firebase
const serviceAccount = require('./serviceAccountKey.json');

// Inicializar Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/api/operatividad', async (req, res) => {
  const snapshot = await db.collection('operatividad').get();
  const datos = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  res.json(datos);
});


// Ruta: /api/usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const datos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(datos);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta: /api/equipos
app.get('/api/equipos', async (req, res) => {
  try {
    const snapshot = await db.collection('equipos').get();
    const datos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(datos);
  } catch (err) {
    console.error('Error al obtener equipos:', err);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});

// Ruta: /api/contratos
app.get('/api/contratos', async (req, res) => {
  try {
    const snapshot = await db.collection('contratos').get();
    const datos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(datos);
  } catch (err) {
    console.error('Error al obtener contratos:', err);
    res.status(500).json({ error: 'Error al obtener contratos' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ API escuchando en http://localhost:${PORT}`);
});
