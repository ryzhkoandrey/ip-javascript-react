

'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start() {
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

        while (personalMovieDB.count === '' || personalMovieDB.count === null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    rememberMyFilms() {
        for (let i = 0; i < 2; i++) {
            const filmName = prompt('Один из последних просмотренных фильмов?', '').trim();
            const filmRating = prompt('На сколько оцените его?', '');

            if (filmName !== null && filmRating !== null && filmName !== '' && filmRating !== '' && filmName.length < 50) {
                personalMovieDB.movies[filmName] = filmRating;
                console.log('done');
            } else {
                console.log('error');
                i--;
            }
        }
    },
    detectPersonalLevel() {
        if (personalMovieDB.count < 10) {
            console.log('Просмотрено довольно мало фильмов');
        } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
            console.log('Вы классический зритель');
        } else if (personalMovieDB.count > 30) {
            console.log('Вы киноман');
        } else {
            console.log('Произошла ошибка');
        }
    },
    showMyDB(hidden) {
        if (!hidden) {
            console.log(personalMovieDB);
        }
    },
    toggleVisibleMyDB() {
        personalMovieDB.privat = !personalMovieDB.privat;
    },
    writeYourGenres() {
        let genres;

        do {
            genres = prompt('Введите ваши любимые жанры, через запятую', '').toLowerCase();
        } while (genres === null || genres === '');

        personalMovieDB.genres = genres.trim().split(', ');
        personalMovieDB.genres.sort();

        personalMovieDB.genres.forEach((genre, i) => {
            console.log(`Любимый жанр #${i + 1} - это ${genre}`);
        });
    },
}

console.log(personalMovieDB);