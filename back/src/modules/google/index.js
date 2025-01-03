import { OAuth2Client } from 'google-auth-library'

class GoogleModule {
  constructor() {
    this.client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE)
  }

  async decodeToken(token) {
    try {
      return await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID_GOOGLE,
      })
    } catch (error) {
      throw new Error("Error during auth. Try again later.")
    }
  }
}

export default new GoogleModule()
