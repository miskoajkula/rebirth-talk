import { createClient } from 'redis'

class RedisModule {

  constructor () {
    if (typeof RedisModule.instance === 'object') {
      return RedisModule.instance
    }

    RedisModule.instance = this
    this.client = createClient({
      socket: {
        host: 'news_redis',
      },
      password: process.env.REDIS_PASSWORD ?? 'test123',
    })
    this.client.connect()
    return this
  }

  static getInstance () {
    RedisModule.instance = RedisModule.instance || new RedisModule()
    return RedisModule.instance
  }

  async get (key) {
    return this.client?.get(key)
  }

  async set (key, value, expSeconds) {

    if (expSeconds) {
      return this.client?.set(key, value, {
        EX: expSeconds,
        NX: true,
      }).catch(reason => {
        console.log(reason)
      })
    }

    return this.client?.set(key,  value).catch(reason => {
      console.log(reason)
    })
  }
}

export { RedisModule }

export default RedisModule
