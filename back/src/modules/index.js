
import getDbInstance from '../database/index.js'
import RSSModule from './rss/index.js'
import NewsModule from './news/index.js'
import RedisModule from './redis/index.js'

const modules = [
  RSSModule,
  NewsModule,
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
