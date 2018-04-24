var gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	fileinclude  = require('gulp-file-include'),
	spriter = require('gulp-css-spriter'),
	tiny = require('gulp-tinypng-nokey'),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('js',function(){
	gulp.src('./src/js/*.js')
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(sourcemaps.write(''))
	.pipe(gulp.dest('./dist/js'))
})

gulp.task('scss',function(){
	gulp.src('./src/css/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(cssmin({
	    advanced: false,                       // 类型：Boolean 默认：true 是否开启高级优化（合并选择器等）
	    compatibility: 'ie7',                  // 类型：String 默认：' ' or  '*' [ 启用兼容模式：'ie7'：IE7 兼容模式，'ie8'：IE8 兼容模式，'*'：IE9+ 兼容模式 ]    
	    keepBreaks: true,                    // 类型：Boolean 默认：false   是否保留换行
	    keepSpecialComments: '*'     // 保留所有特殊前缀，当你用 autoprefixer 生成浏览器前缀时，如果不加这个参数，有可能将会删除你的部分前缀
	}))
	.pipe(sourcemaps.write(''))
	.pipe(gulp.dest('./dist/css'))
})

//css压缩
gulp.task('cssmin',function(){
	gulp.src('./src/css/*.css')
	.pipe(cssmin({
	    advanced: false,                       // 类型：Boolean 默认：true 是否开启高级优化（合并选择器等）
	    compatibility: 'ie7',                  // 类型：String 默认：' ' or  '*' [ 启用兼容模式：'ie7'：IE7 兼容模式，'ie8'：IE8 兼容模式，'*'：IE9+ 兼容模式 ]    
	    keepBreaks: true,                    // 类型：Boolean 默认：false   是否保留换行
	    keepSpecialComments: '*'     // 保留所有特殊前缀，当你用 autoprefixer 生成浏览器前缀时，如果不加这个参数，有可能将会删除你的部分前缀
	}))
	.pipe(gulp.dest('./src/css/min'))
})

//添加CSS兼容代码
gulp.task('testAutoFx', function () {
    gulp.src('src/css/index.css')
    .pipe(autoprefixer({
        browsers: ['last 1000 versions'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images',function(){
	gulp.src('./src/images/*.*')
//	.pipe(imagemin({
//		progressive: true,
//		use: [pngquant()]
//	}))
//	不给力的东西
	.pipe(tiny())
	.pipe(gulp.dest('./dist/images'))
})

/*
 * 合成雪碧图
 */
gulp.task('sprite',function(){  
 	gulp.src('./dist/css/*.css')
    .pipe(spriter({
	    // 生成的spriter的位置
	    'spriteSheet': './dist/images/sprite.png',
	    // 生成样式文件图片引用地址的路径
	    // 如下将生产：backgound:url(../images/sprite20324232.png)
	    'pathToSpriteSheetFromCSS': '../images/sprite.png'
	}))
    .pipe(gulp.dest('./dist/css'));
}) 

gulp.task('watch',function(){
	gulp.watch('./src/css/*.scss',['scss']);
	gulp.watch('./src/images/*',['images']);
	gulp.watch('./src/js/*.js',['js']);
	gulp.watch('./src/**.html',['fileinclude']);
//	gulp.watch('./dist/css/*.css',['sprite']);
})

gulp.task('fileinclude', function() {
    return gulp.src('./src/**.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file',
          context: {
		    name: 'test'
		  }
        }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['scss','js','images','fileinclude'])