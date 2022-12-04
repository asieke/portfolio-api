const { db, sequelize } = require('../index');

const main = async () => {
  console.log('INIT DATABASE...');
  await db.initialize();
  db.close();
  console.log('DONE');
};

main();
