// Définition des dépendance dont on a besoin pour exécuter les taches.
var
    gulp = require( 'gulp' ),
    imagemin = require( 'gulp-imagemin' ),
    newer = require( 'gulp-newer' ),
    size = require( 'gulp-size' ),
    destClean = require( 'gulp-dest-clean' ),
    imacss = require( 'gulp-imacss' ),
    sass = require( 'gulp-sass' ),
    del = require( 'del' );

// Définition de quelques variables générales pour notre gulpfile.
var
    sSource = 'source/',
    sDest = 'build/';

// Définition de quelques variables liées à nos taches (options de taches).
var
    oImagesOpts = {
        // *.* => "expression régulière quelque chose . quelque chose"
        in: sSource + 'images/*.*',
        out: sDest + 'images/',
        watch: sSource + 'images/*.*'
    },
    oImageUriOpts = {
        in: sSource + 'images/inline/*.*',
        out: sSource + 'scss/images/',
        filename: '_datauri.scss',
        namespace: 'img'
    },
    oCss = {
        in: sSource + 'scss/main.scss',
        watch: [sSource + 'scss/**/*'],
        out: sDest + 'css/',
        oSassOpts: {
            outputStyle: 'compressed',
            precision: 3,
            errLogToConsole: true
        }
    };

// Définition des taches.
gulp.task( 'clean', function(){
    del( [sDest + '*'] )
} )

gulp.task( 'images', function(){
    return gulp.src( oImagesOpts.in )
        .pipe( destClean( oImagesOpts.out ) )
        // pipe() permet d'enchainer les actions l'une à la suite de l'autre.
        // permet de ne faire que ce qui n'est pas encore fait sans recommencer depuis le début.
        .pipe( newer( oImagesOpts.out ) )
        .pipe( size( {title: 'Images size before compression: ', showFiles: true} ) )
        .pipe( imagemin() )
        .pipe( size( {title: 'Images size after compression: ', showFiles: true} ) )
        .pipe( gulp.dest( oImagesOpts.out ) );
} )

gulp.task( 'imageuri', function(){
    return gulp.src( oImageUriOpts.in )
        .pipe( imagemin() )
        .pipe( imacss( oImageUriOpts.filename, oImageUriOpts.namespace ) )
        .pipe( gulp.dest( oImageUriOpts.out ) );
} )

gulp.task( 'sass', function(){
    return gulp.src( oCss.in )
        .pipe(sass( oCss.oSassOpts ))
        .pipe( gulp.dest(oCss.out) );
} )

// Tache par défault exécuté lorsqu'on tape juste gulp dans le terminal.
gulp.task('default', ['images', 'sass'], function(){
    gulp.watch( oImagesOpts.watch, ['images'] );
    gulp.wathc( oCss.watch, ['sass'] );
});
