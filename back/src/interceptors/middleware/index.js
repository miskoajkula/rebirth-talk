import pkg from 'jsonwebtoken'
import { users } from '#database/schema/user.js'
import { eq } from 'drizzle-orm'
const { verify } = pkg

export const authMiddleware = (db) => async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    req.user = null
    next()
    return
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET)
    const userRes = await db.select().from(users).where(eq(users.id, decoded.userId))

    if (userRes.length === 0) {
      return res.status(401).json({ message: 'Invalid token. User not found.' })
    }

    req.user = userRes[0]
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' })
  }
}
