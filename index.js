const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Validar variable de entorno
if (!process.env.FIREBASE_KEY) {
  console.error('❌ La variable de entorno FIREBASE_KEY no está definida.');
  process.exit(1);
}

// Parsear clave de servicio, reemplazando \\n por saltos de línea reales
let serviceAccount;
try {
  const firebaseKeyFixed = process.env.FIREBASE_KEY.replace(/\\n/g, '\n');
  serviceAccount = JSON.parse(firebaseKeyFixed);
} catch (error) {
  console.error('❌ Error al parsear FIREBASE_KEY:', error.message);
  process.exit(1);
}

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// === Endpoints ===

// Ruta: /api/operatividad
app.get('/api/operatividad', async (req, res) => {
  try {
    const snapshot = await db.collection('operatividad').get();
    const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(datos);
  } catch (err) {
    console.error('❌ Error al obtener operatividad:', err);
    res.status(500).json({ error: 'Error al obtener operatividad' });
  }
});

// Ruta: /api/usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(datos);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Ruta: /api/equipos
app.get('/api/equipos', async (req, res) => {
  try {
    const snapshot = await db.collection('equipos').get();
    const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(datos);
  } catch (err) {
    console.error('❌ Error al obtener equipos:', err);
    res.status(500).json({ error: 'Error al obtener equipos' });
  }
});

// Ruta: /api/contratos
app.get('/api/contratos', async (req, res) => {
  try {
    const snapshot = await db.collection('contratos').get();
    const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(datos);
  } catch (err) {
    console.error('❌ Error al obtener contratos:', err);
    res.status(500).json({ error: 'Error al obtener contratos' });
  }
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`✅ API escuchando en http://localhost:${PORT}`);
});
