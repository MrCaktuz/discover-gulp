// Définition des dépendance dont on a besoin pour exécuter les taches.
var
    gulp = require( 'gulp' ),
    imagemin = require( 'gulp-imagemin' ),
    newer = require( 'gulp-newer' ),
    size = require( 'gulp-size' ),
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
        out: sDest + 'images/'
    };

// Définition des taches.
gulp.task( 'clean', function(){
    del( [sDest + '*'] )
} )

gulp.task( 'images', function(){
    gulp.src( oImagesOpts.in )
        // pipe() permet d'enchainer les actions l'une à la suite de l'autre.
        // permet de ne faire que ce qui n'est pas encore fait sans recommencer depuis le début.
        .pipe( newer( oImagesOpts.out ) )
        .pipe( size( {title: 'Images size before compression: ', showFiles: true} ) )
        .pipe( imagemin() )
        .pipe( size( {title: 'Images size after compression: ', showFiles: true} ) )
        .pipe( gulp.dest( oImagesOpts.out ) )
} )

// Tache par défault exécuté lorsqu'on tape juste gulp dans le terminal.
gulp.task('default', function(){
    console.log('test');
});
