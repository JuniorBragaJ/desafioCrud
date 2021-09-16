const PORT = process.env.PORT || 3000;
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path')
const render = require('koa-ejs');
const bodyparser = require('koa-bodyparser');
const koa = new Koa();
var router = new Router();

koa.use(bodyparser());

render(koa, {
  root: path.join(__dirname, 'pages'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

koa
  .use(router.routes())
  .use(router.allowedMethods())

const server = koa.listen(PORT);

module.exports = server;

var users = []

router.get('/', async ctx => {
    await ctx.render('listaUsuarios', {
      users: users},
      )
  });

router.get('/cadastro', async ctx => {
    await ctx.render('cadastro')
} )

router.post('/cadastro', add)

async function add(ctx) {
  const body = ctx.request.body
  const userInfo = {
    name: body.name,
    email: body.email,
    age: body.age,
  }
  console.log(userInfo)
  users.push(userInfo)
  ctx.redirect('/')
}



