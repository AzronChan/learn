var gulp = require('gulp'),
	release = false,								//是否打包
	sourcemaps = require('gulp-sourcemaps'),	//生成amp
	uglify = require('gulp-uglify'),			//压缩JS
	sass = require('gulp-sass'),				//sass
	fileinclude  = require('gulp-file-include'),	//模板应用
	spriter = require('gulp-css-spriter'),		//雪碧图
	tiny = require('gulp-tinypng-nokey'),		//压缩图片
	rev = require('gulp-rev'), 					//MD5
    revCollector = require('gulp-rev-collector'), //MD5路径替换
    gulpSequence = require('gulp-sequence'), //顺序执行
    gulpif = require('gulp-if'),//if 判断
    cssmin = require('gulp-clean-css'),				//压缩CSS
    autoprefixer = require('gulp-autoprefixer'),	//生成兼容前缀 -webkit-
	spritesmith = require('gulp.spritesmith');	//雪碧图

//工具-压缩js
gulp.task('uglifyjs',function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'))
})

//工具-压缩img
gulp.task('imgmin',function(){
	gulp.src('./src/images/*')
	.pipe(tiny())
	.pipe(gulp.dest('./dist/images'))
})

//工具-压缩css
gulp.task('cssmin',function(){
	gulp.src('./src/css/*.css')
	.pipe(cssmin({
	    advanced: false,                      
	    compatibility: 'ie7',  
	    keepBreaks: true,  
	    keepSpecialComments: '*' 
	}))
	.pipe(gulp.dest('./dist/css'))
})

//工具-生成兼容前缀
gulp.task('cssfix',function(){
	gulp.src('./src/css/*.css')
	.pipe(autoprefixer())
	.pipe(gulp.dest('./dist/css'))
})

//工具-生成雪碧图-pc
gulp.task('sprite',function(){
	gulp.src(['src/images/*.png'])
	.pipe(spritesmith({
        imgName: '../../src/images/sprite.png',//保存合并后图片的地址
        cssName: '../../src/css/sprite.scss',//保存合并后对于css样式的地址
        padding:5,	//合并时两个图片的间距
        algorithm: 'left-right',
        cssTemplate:function (data) {
            var arr=[];
            data.sprites.forEach(function (data) {
                arr.push(".icon_"+data.name+
                "{" +
                "background-image: url('"+data.escaped_image+"');"+
                "background-position: "+data.px.offset_x+" "+data.px.offset_y+";"+
                "width:"+data.px.width+";"+
                "height:"+data.px.height+";"+
                "}\n");
            });
            return arr.join("");
        }
    }))
    .pipe(gulp.dest('./dist/images'));
})

/*
 * 工具-生成雪碧图-h5
 * 750为原型稿宽，750下1rem = 100px计算
 */
gulp.task('h5-sprite',function(){
	gulp.src('src/images/*.png')
	.pipe(spritesmith({
        imgName: '../../src/images/sprite.png',//保存合并后图片的地址
        cssName: '../../src/css/sprite.scss',//保存合并后对于css样式的地址
        padding: 10,//合并时两个图片的间距
        algorithm: 'top-down',
        cssTemplate:function (data) {
            var arr=[],totalHeigth = 0,maxWidth = 0,_time = Math.random().toString().substr(3,8);
            data.sprites.forEach(function (data) {
            	if (parseInt(data.px.width) > maxWidth){
            		maxWidth = parseInt(data.px.width);
            	}
            	totalHeigth += parseInt(data.px.height) + 10;
            })
           	totalHeigth = totalHeigth - 10;
            data.sprites.forEach(function (data) {
                arr.push(".icon_"+data.name+
                "{" +
                "background-size:" +  (maxWidth / 100) + "rem " + (totalHeigth / 100) + "rem;" + 
                "background-image: url('../images/" + data.escaped_image +  "?" + _time + "');"+
                "background-position: 0% "  + parseInt(data.px.offset_y) / (parseInt(data.px.height) - totalHeigth) * 100 + "%;" +
                "width:" +  parseInt(data.px.width) / 750 * 100  + "%;"+
                "height:" + parseInt(data.px.height) / 100 +"rem;"+
                "}\n");
            });
            return arr.join("");
        }
    }))
    .pipe(gulp.dest('./dist/images'));
})


//工作流
//sass
gulp.task('flow-css',function(){
	gulp.src('./src/css/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error',sass.logError))
	.pipe(cssmin({
	    advanced: false,                       // 类型：Boolean 默认：true 是否开启高级优化（合并选择器等）
	    compatibility: 'ie7',                  // 类型：String 默认：' ' or  '*' [ 启用兼容模式：'ie7'：IE7 兼容模式，'ie8'：IE8 兼容模式，'*'：IE9+ 兼容模式 ]    
	    keepBreaks: true,                    // 类型：Boolean 默认：false   是否保留换行
	    keepSpecialComments: '*'     // 保留所有特殊前缀，当你用 autoprefixer 生成浏览器前缀时，如果不加这个参数，有可能将会删除你的部分前缀
	}))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write(''))
	.pipe(gulpif(release,rev()))
	.pipe(gulp.dest('./dist/css'))
	.pipe(gulpif(release,rev.manifest()))
	.pipe(gulpif(release,gulp.dest('./dist/css')))
})

//压缩JS
gulp.task('flow-js',function(){
	gulp.src('./src/js/*.js')
	.pipe(sourcemaps.init())
	.pipe(gulpif(release,uglify()))
	.pipe(sourcemaps.write(''))
	.pipe(gulpif(release,rev()))
	.pipe(gulp.dest('./dist/js'))
	.pipe(gulpif(release,rev.manifest()))
	.pipe(gulpif(release,gulp.dest('./dist/js')))
})

//压缩图片
gulp.task('flow-images',function(){
	gulp.src('./src/images/*')
	.pipe(gulpif(release,tiny()))
	.pipe(gulpif(release,rev()))
	.pipe(gulp.dest('./dist/images'))
	.pipe(gulpif(release,rev.manifest()))
	.pipe(gulpif(release,gulp.dest('./dist/js')))
}) 

gulp.task('flow-fileinclude', function() {
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

gulp.task('rev', function() {
  gulp.src(['./dist/css/rev-*.json','./dist/js/rev-*.json', './dist/*.html'])
    .pipe(revCollector()) //- 执行文件内css名的替换
    .pipe(gulp.dest('./dist/')); //- 替换后的文件输出的目录
});

gulp.task('watch',function(){
	gulp.watch('./src/css/*.scss',['flow-css']);
	gulp.watch('./src/images/*',['flow-images']);
	gulp.watch('./src/js/*.js',['flow-js']);
	gulp.watch('./src/**.html',['flow-fileinclude']);
})


/*
 * 根据CSS合成雪碧图
 */
gulp.task('spriteforcss',function(){
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


gulp.task('release',function(cb){
	release = true;
	gulpSequence('flow-scss','flow-js','flow-images','flow-fileinclude','rev',cb)
})

gulp.task('default', ['flow-scss','flow-js','flow-images','flow-fileinclude'])