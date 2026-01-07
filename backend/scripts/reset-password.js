require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function resetPassword() {
  try {
    console.log('\n🔐 Reset de contraseña\n');
    
    const email = await question('Email del usuario: ');
    const newPassword = await question('Nueva contraseña: ');
    
    if (!email || !newPassword) {
      console.log('\n❌ Debes proporcionar email y contraseña');
      rl.close();
      process.exit(1);
    }
    
    // Verificar que el usuario existe
    const userCheck = await pool.query(
      'SELECT id, email, name FROM users WHERE email = $1',
      [email]
    );
    
    if (userCheck.rows.length === 0) {
      console.log(`\n❌ No existe usuario con el email: ${email}`);
      rl.close();
      process.exit(1);
    }
    
    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Actualizar contraseña
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );
    
    console.log('\n✅ Contraseña actualizada exitosamente');
    console.log(`   Usuario: ${userCheck.rows[0].name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Nueva contraseña: ${newPassword}\n`);
    
    rl.close();
    await pool.end();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

resetPassword();
