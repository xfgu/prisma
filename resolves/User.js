function posts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).posts()
}
function carts(parent, args, context) {
  return context.prisma.user({ id: parent.id }).carts()
}
function items(parent, args, context) {
  return context.prisma.user({ id: parent.id }).items()
}
module.exports = {
  posts,
  items,
  carts

}