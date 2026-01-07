require('dotenv').config();
const pool = require('../config/database');

async function listUsers() {
  try {
    const result = await pool.query(
      'SELECT id, email, name, created_at FROM users ORDER BY created_at DESC'
    );
    
    console.log('\n📊 Usuarios en la base de datos:\n');
    
    if (result.rows.length === 0) {
      console.log('❌ No hay usuarios registrados\n');
    } else {
      result.rows.forEach((user, i) => {
        console.log(`${i + 1}. Email: ${user.email}`);
        console.log(`   Nombre: ${user.name}`);
        console.log(`   ID: ${user.id}`);
        console.log(`   Creado: ${user.created_at}\n`);
      });
      console.log(`✅ Total: ${result.rows.length} usuario(s)\n`);
    }
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al consultar usuarios:', error.message);
    process.exit(1);
  }
}

listUsers();
