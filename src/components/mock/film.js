const Titles = [
  `Назад в будущее`,
  `Бойцовский клуб`,
  `Друзья`,
  `Чип и дейл`,
  `Космонавт`
];

const Years = [
  1901,
  1950,
  1981,
  2009
];

const Genres = [
  `Music`,
  `Thriller`,
  `Drama`,
  `Comedy`
];

const Durations = [
  `1h 55m`,
  `6h 56m`,
  `3h 00m`,
  `2h 06m`,
  `0h 00m`
];

const Posters = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`
];

const Descriptions = [
  `sucks is Descriptions`,
  `gooood! is Descriptions`,
  `oh my GOD!!!! is Descriptions`
];

const Persons = [
  `Шмакозявка Фризовна`,
  `Кумыс Ахметович`,
  `Марат Васильев`,
  `Бред Питт`,
  `Арнольд Шварценнегер`,
  `Чувак Лебовски`
];

const ReleaseDate = [
  `30 March 1945`,
  `1 May 2001`,
  `10 January 2033`,
  `24 Aplril 1901`
];

const Country = [
  `Russia`,
  `USA`,
  `Mexico`,
  `China`
];

const Emojis = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getElement = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const getGenerateArrElements = (arr) => {
  return new Array(getRandomNumber(1, arr.length))
    .fill(``)
    .map(() => getElement(arr));
};

const getGenerateArrObjects = (cb) => {
  return new Array(getRandomNumber(0, 5))
    .fill(``)
    .map(() => cb());
};

const generateComments = () => {
  return {
    emoji: getElement(Emojis),
    text: getElement(Descriptions),
    author: getElement(Persons),
    day: `2019/12/31 23:59`
  };
};

const generateFilm = () => {
  return {
    title: getElement(Titles),
    rate: getRandomNumber(0, 10),
    year: getElement(Years),
    duration: getElement(Durations),
    genres: getGenerateArrElements(Genres),
    poster: getElement(Posters),
    description: getElement(Descriptions),
    ageRate: getRandomNumber(0, 18),
    titleOriginal: getElement(Titles) + `-> origin`,
    director: getGenerateArrElements(Persons).join(`, `),
    writers: getGenerateArrElements(Persons).join(`, `),
    actors: getGenerateArrElements(Persons).join(`, `),
    releaseDate: getElement(ReleaseDate),
    country: getElement(Country),
    comments: getGenerateArrObjects(generateComments)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
