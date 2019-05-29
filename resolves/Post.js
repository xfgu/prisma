function authid(parent, args, context) {
  return context.prisma.post({ id: parent.id }).authid()
}

module.exports = {
  authid,
}