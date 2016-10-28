require("babel-core/register")(
    {
        presets: ['stage-2','es2015']
    }
);

require("babel-polyfill");

require("./src/server.js");
