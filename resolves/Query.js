// function post(parent, args, context, info) {
//   return context.prisma.post()
// }
const { APP_SECRET, getUserId } = require('../src/utils')

function posts(parent, args, context, info) {
  return context.prisma.posts()
}

 function me(parent, args, context){
  const userId = getUserId(context)
  return  context.prisma.user({ id: userId })
}

function items(parent, args, context, info) {
  return context.prisma.items()
}
module.exports = {
  items,
  posts,
  me
}