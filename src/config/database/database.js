import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

//function to authenticate
export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully. 😎');
  } catch (error) {
    console.error(error);
  }
}

//function to synchronize
export async function syncUp() {
  try {
    await sequelize.sync();
    console.log('Database has been synced successfully 👌');
  } catch (error) {
    console.error(error);
  }
}
