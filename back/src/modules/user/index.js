import { users } from '#database/schema/user.js'
import { eq } from 'drizzle-orm'

class UserModule {

  init (db) {
    this.db = db
    this.num = Math.random()
  }


  async checkAccount(email) {
    console.log(email)
    const userRes = await this.db.select({
      id: users.id,
      socialAuth: users.socialAuth
    })
    .from(users)
    .where(eq(users.email, email))


    if(userRes.length === 0) {
       return {
         userExists: false,
       }
    }

    return {
      userExists: true,
      socialAuth: userRes[0].socialAuth
    }
  }
}

export default new UserModule()
