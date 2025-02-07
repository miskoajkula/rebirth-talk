import { users } from '#database/schema/user.js'
import { and, eq, ne } from 'drizzle-orm'
import googleModule from '#modules/google/index.js'
import bcrypt from 'bcrypt'

import pkg from 'jsonwebtoken'

const { sign } = pkg

class UserModule {

  init (db) {
    this.db = db
    this.num = Math.random()
    console.log("init")
  }

  async checkAccount (email) {

    console.log(email)
    const userRes = await this.db.select({
      id: users.id,
      socialAuth: users.socialAuth,
    }).from(users).where(eq(users.email, email))

    console.log('res')
    console.log(userRes)
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

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    await this.db.insert(users).values({
      email,
      password: hashedPassword,
      username: `user-${new Date().getTime()}`,
    })

    return true
  }

  async getByEmail (email) {
    const userRes = await this.db.select().from(users).where(eq(users.email, email))

    if (userRes.length === 0) {
      return null
    }

    return userRes[0]
  }

  async createSocialUser (email) {
    return await this.db.insert(users).values({
      email,
      username: `user-${new Date().getTime()}`,
      isVerified: true,
      socialAuth: true,
    }).returning()
  }

  async socialLogin (
    token,
  ) {
    const { payload } = await googleModule.decodeToken(token)
    const email = payload.email
    let user = await this.getByEmail(email)

    if (!user) {
      console.log('== should create == ')
      user = await this.createSocialUser(email)
    }

    if (!user.socialAuth) {
      throw new Error('It seems you already have an account with this email. Please log in using your email and password.')
    }

    return this.generateAuthResponse(user)
  }

  async generateAuthResponse (user) {

    const refreshToken = sign({ userId: user.id, createdAt: user.createdAt.toString() }, process.env.JWT_SECRET, {
      expiresIn: '4w',
    })

    return { token: refreshToken, userInfo: user }
  }

  async loginViaEmail ({ email, password }) {
    const user = await this.getByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    if (!user.isVerified) {
      throw new Error('User not verified')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Password is incorrect')
    }

    return this.generateAuthResponse(user)
  }

  async requestPasswordReset (email) {
    const user = await this.getByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    if (!user.isVerified) {
      throw new Error('User not verified')
    }

    //todo send email

    return true
  }

  updatableFields = ['username', 'avatar', 'communities']

  async checkForDuplicateUsername (username, inputUserId) {
    const [existingUser] = await this.db.select().from(users).where(
      and(
        eq(users.username, username),
        ne(users.id, inputUserId),
      ),
    )
    if (existingUser) {
      throw new Error('Username is already taken')
    }
  }

  async updateProfile (payload, user) {

    const updateFields = {}

    for (const key of this.updatableFields) {
      if (payload[key]) {
        updateFields[key] = payload[key]
      }
    }

    if (payload.username) {
      await this.checkForDuplicateUsername(payload.username, user.id)
    }

    if (updateFields['avatar']) {
      updateFields['avatar'] = JSON.parse(JSON.stringify(updateFields['avatar']))
    }

    if (updateFields['communities']) {
      updateFields['communities'] = JSON.parse(JSON.stringify(updateFields['communities']))
    }

    await this.db.update(users).set(updateFields).where(eq(users.id, user.id))

    return true
  }
}

export default new UserModule()
