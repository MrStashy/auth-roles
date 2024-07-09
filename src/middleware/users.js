const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken')

async function verifyToken(req, res, next) {
    const [ _, token ] = req.get('Authorization').split(' ')
    try {
       const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET)
       req.id = verifiedPayload.sub
    } catch (e) {
        return res.status(403).json( {message: 'Access denied - user not logged in'} )
    }

    next()
}

async function verifyAdmin(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {id: req.id}
    })
   
    if (user.role !== 'ADMIN') {
        return res.status(403).json( {message: 'Access denied - must be admin to access'} )
    }

    next()
}

module.exports = { verifyAdmin, verifyToken }