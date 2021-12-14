const {src, dest} = require("gulp");

// configuration
const path = require("../config/path.js");
const app = require("../config/app.js");

// plagins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const svgSprite = require("gulp-svg-sprite");
const svgMin = require("gulp-svgmin");
const svgCheerio = require("gulp-cheerio");
const svgReplace = require("gulp-replace");


// processing Sprite
const sprite = () => {
    return src(path.sprite.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Sprite",
                message: error.message
            }))
        }))
        .pipe(svgMin({
            js2svg: { pretty: true }
        }))
        .pipe(svgCheerio({
            run: function($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgReplace('&gt;', '>'))
        .pipe(svgSprite(app.svgSprite))
        .pipe(dest(path.sprite.dest))
}

module.exports = sprite;