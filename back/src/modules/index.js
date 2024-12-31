import getDbInstance from '../database/index.js'
import UserModule from './user/index.js'
import RedisModule from './redis/index.js'

const modules = [
  UserModule,
  RedisModule
];


const initializeModules = async () => {
  try {
    const db = await getDbInstance();

    modules.forEach(module => {

      if (typeof module.init === 'function') {
        module.init(db);
      }
    });

  } catch (error) {
    console.error('Failed to initialize the database:', error);
  }
};

export default initializeModules;
