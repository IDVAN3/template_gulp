const {src, dest} = require("gulp");

// configuration
const path = require("../config/path.js");
const app = require("../config/app.js");

// plagins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const webpHtml = require("gulp-webp-html");


// processing HTML
const html = () => {
    return src(path.html.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileInclude())
        .pipe(webpHtml())
        .pipe(size({ title: "before compression" }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: "after compression" }))
        .pipe(dest(path.html.dest))
}

module.exports = html;