async function verifyAdmin(req, res, next) {
    const user = await prisma.user.findUnique({
        where: {id: req.id}
    })
   
    if (user.role !== 'ADMIN') {
        return res.status(403).json( {error: 'Access denied - must be admin to access'} )
    }

    next()
}

module.exports = { verifyAdmin }