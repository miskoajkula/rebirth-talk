import { users } from '#database/schema/user.js'
import { eq } from 'drizzle-orm'

class UserModule {

  init (db) {
    this.db = db
    this.num = Math.random()
  }

  async checkAccount (email) {
    console.log(email)
    const userRes = await this.db.select({
      id: users.id,
      socialAuth: users.socialAuth,
    }).from(users).where(eq(users.email, email))

    if (userRes.length === 0) {
      return {
        userExists: false,
      }
    }

    return {
      userExists: true,
      socialAuth: userRes[0].socialAuth,
    }
  }

  async registerViaEmail ({ email, password }) {
    const accountCheck = await this.checkAccount(email)
    if (accountCheck.userExists) {
      return false
    }

    // todo add email verification

    await this.db.insert(users).values({
      email,
      password,
      username: `user-${new Date().getTime()}`,
    })

    return true
  }
}

export default new UserModule()
