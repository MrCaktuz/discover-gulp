// Définition des dépendance dont on a besoin pour exécuter les taches.
var
    gulp = require( 'gulp' ),
    imagemin = require( 'gulp-imagemin' );

// Définition de quelques variables générales pour notre gulpfile.
var
    source = 'source/',
    dest = 'build/'

// Définition de quelques variables liées à nos taches (options de taches).
var
    imagesOpts = {

    };

// Définition des taches.
gulp.task( 'images', function(){
    gulp.src()
} )

// Tache par défault exécuté lorsqu'on tape juste gulp dans le terminal.
gulp.task('default', function(){
    console.log('test');
});
