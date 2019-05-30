const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
  APP_SECRET,
  getUserId
} = require('../src/utils')

async function signup(parent, args, context) {
  // 1
  const password = await bcrypt.hash(args.password, 10)
  // 2
  const user = await context.prisma.createUser({
    ...args,
    password
  })

  // 3
  const token = jwt.sign({
    userId: user.id
  }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context) {
  // 1
  const user = await context.prisma.user({
    email: args.email
  })
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({
    userId: user.id
  }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}


function createPost(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createPost({
    name: args.name,
    description: args.description,
    authid: {
      connect: {
        id: userId
      }
    },
  })
}


async function createCart(parent, args, context) {
  const userId = getUserId(context)
  console.log('userId :', userId);

  const [cart] = await context.prisma.carts({
    where: {
      user: {
        id: userId
      },
      item: {
        id: args.id
      }
    }
  })
  console.log('cart', cart)
  if(cart){
    return await context.prisma.updateCart({
      where: {
        id: cart.id
      },
      data: {
        count: cart.count + 1,
      },
     
    })
  }
  // 如果不存在就创建
  return context.prisma.createCart({
    user: { connect: { id: userId } },
    item: { connect: { id: args.id } },
  })
 
}
module.exports = {
  signup,
  login,
  createPost,
  createCart
}