function user(parent, args, context) {
  return context.prisma.cart({ id: parent.id }).user()
}
function item(parent, args, context) {
  return context.prisma.cart({ id: parent.id }).item()
}
module.exports = {
  user,
  item
}