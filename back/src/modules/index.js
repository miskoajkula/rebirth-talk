import UserModule from './user/index.js'
import PostsModule from './post/index.js'
import RedisModule from './redis/index.js'

const modules = [
  UserModule,
  PostsModule,
  RedisModule
];


const initializeModules = async (db) => {
  try {

    modules.forEach(module => {
      console.log(module);

      if (typeof module.init === 'function') {
        module.init(db);
      }
    });

  } catch (error) {
    console.error('Failed to initialize the database:', error);
  }
};

export default initializeModules;
