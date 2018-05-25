var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require("browser-sync");

// test gulp.task
gulp.task("test", function(){
	console.log("This is a test Hello world");
});

// task convert from *.scss into *.css
gulp.task("sass", function(){
	return gulp.src("./public/stylesheet/scss/**/*.+(scss|sass)") // source file
	.pipe(sass()) // do function, now mean convert scss into css
	.pipe(gulp.dest('./public/stylesheet/css')) // destination where source file pipe to
	.pipe(browserSync.reload({stream: true})); // reloading browser when new css file updated
})

// gulp.task("css", function(){
//	return gulp.src("public/stylesheet/css/**/*.css")
//	.pipe(browserSync.reload({stream:true}));
//}); 


// task for creating server browserSync and let it know where is the root folder of server/file
/*
gulp.task("browserSync", function(){
	bs = browserSync.init({server : { 
		baseDir : 'public'},
		logSnippet: false,
		port : 8888,
	})
}); 
*/

// connect to server.js and restart when making change
var nodemon = require('gulp-nodemon');
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['dist/']
  })
  .on('restart', function() {
    console.log('>> node restart');
  })
});

gulp.task("server", function() {
	
});

gulp.task("watch", ["sass", 'nodemon'], function(){
	gulp.watch("./public/stylesheet/scss/**/*.+(scss|sass)", ['sass']);
	//gulp.watch("./public/html/**/*.html").on('change', browserSync.reload);
	//gulp.watch("./public/stylesheet/css/**/*.css").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);