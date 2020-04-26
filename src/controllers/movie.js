import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import {render, append, remove, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._cardFilmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onOpenPopupClick = this._onOpenPopupClick.bind(this);

    //append.bind(this._filmPopupComponent);
  }

  render(film) {
    this._cardFilmComponent = new CardFilmComponent(film);
    this._filmPopupComponent = new FilmPopupComponent(film);

    this._cardFilmComponent.setClickHandler(this._onOpenPopupClick);
    this._filmPopupComponent.setClickHandler(this._closePopup);

    this._cardFilmComponent.setWashlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlist: !film.isWatchlist,
      }));
    });

    this._cardFilmComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWached: !film.isWached,
      }));
    });

    this._cardFilmComponent.setFavoriteButtonClickHandler(() => {
      //debugger;
      //console.log(film);
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
      //debugger;
      //console.log(film);
    });

    render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
  }

  _onOpenPopupClick() {
    const bodyElement = document.querySelector(`body`);
    //Console.log(this._filmPopupComponent.get);
    append(bodyElement, this._filmPopupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    this._filmPopupComponent.removePopup();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
