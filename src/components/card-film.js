import AbstractComponent from "../components/abstract-component";

const createCardFilmTemplate = (film) => {
  const {title, rate, year, duration, genres, poster, description, comments} = film;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class CardFilm extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  setClickHandler(handler) {
    const posterCardFilmElement = this.getElement().querySelector(`.film-card__poster`);
    const titleCardFilmElement = this.getElement().querySelector(`.film-card__title`);
    const commentsCardFilmElement = this.getElement().querySelector(`.film-card__comments`);

    posterCardFilmElement.addEventListener(`click`, handler);
    titleCardFilmElement.addEventListener(`click`, handler);
    commentsCardFilmElement.addEventListener(`click`, handler);
  }
}
