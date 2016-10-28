import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import fs from 'fs.promised';
import serve from 'koa-static';
import Vue from 'vue';
import {createBundleRenderer} from 'vue-server-renderer';

const renderer = createRenderer()

const publicPath = path.join(__dirname, '..', 'public');

const app = new Koa();

app.use(serve(publicPath));

app.use(async (ctx, next) => {



    /*
    const template = await fs.readFile(path.join(__dirname, 'components', 'list', 'index.html'), 'utf-8');
    const obj = serverRender(viewmodel, template);

    ctx.body = `<!DOCTYPE html><html><head><title>koa2-vue2测试</title><link rel="icon" href="data:;base64,="> </head><body>${obj.html}</body></html>`;
    */


    /*
    const viewmodel = new Vue({
        template: "<div>hello houxinjie</div>"
    })
    */

    renderer.renderToString(new ViewModel(), (error, html) => {
        ctx.body = html;
    })

    await next();



});


app.on('error', (error, ctx) => {
    console.log(error);
});

app.listen(3000);
