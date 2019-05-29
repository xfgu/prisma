function authid(parent, args, context) {
  return context.prisma.item({ id: parent.id }).authid()
}
// function carts(parent, args, context) {
//   return context.prisma.item({ id: parent.id }).carts()
// }
module.exports = {
  authid,
  // carts
}