const path = require("path");

module.exports = {
    entry: "./src/js/components/app.component.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};