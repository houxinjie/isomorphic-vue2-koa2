import Koa from 'koa'
import path from 'path'
import fs from 'fs'
import serve from 'koa-static'
import Vue from 'vue'
import favicon from 'koa-favicon'
import {createBundleRenderer} from 'vue-server-renderer'
import serialize from 'serialize-javascript'
import CONFIG from './config.js'

process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const resolve = file => path.resolve(__dirname, file)

const publicPath = path.join(__dirname, '..', 'public')

const html = (() => {
    const template = fs.readFileSync(resolve('../index.html'), 'utf-8')
    const i = template.indexOf('{{ APP }}')
    const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
    return {
        head: template.slice(0, i).replace('{{ STYLE }}', style),
        tail: template.slice(i + '{{ APP }}'.length)
    }
})()

const app = new Koa();

app.use(serve(publicPath));
app.use(favicon(resolve('../public/assets/favicon.ico')));

const bundlePath = resolve('../public/dist/server-bundle.js')
let renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'))


function createRenderer (bundle) {
  return createBundleRenderer(bundle, {
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}


app.use(async (ctx, next) => {

    let s = Date.now()
    const context = { url: ctx.req.url }
    const renderStream = renderer.renderToStream(context)
    let body = '';

    function renderStreamOnData(){
        return new Promise((resolve, reject) => {
            renderStream.on('data', resolve)
            renderStream.on('error', reject)
        })
    }

    function renderStreamOnEnd(){
        return new Promise((resolve, reject) => {
            renderStream.on('end', resolve)
            renderStream.on('error', reject);
        })
    }


    function renderStreamPromise(){
        return Promise.all([renderStreamOnData(), renderStreamOnEnd()])
    }

    let firstChunk = true

    try{
        const [chunk,] = await renderStreamPromise();
        if (firstChunk) {
            body += html.head;
            if (context.initialState) {

                body += `<script>window.__INITIAL_STATE__=${
                    serialize(context.initialState, { isJSON: true })
                }</script>`
            }
            firstChunk = false
        }

        body += chunk + html.tail
        ctx.body = body
        console.log(`whole request: ${Date.now() - s}ms`)
    }catch(error){
        console.log(error)
    }

    await next();



});


app.on('error', (error, ctx) => {
    console.log(error);
});

app.listen(CONFIG.port);
console.log(`server started at ${CONFIG.prefix}`)
