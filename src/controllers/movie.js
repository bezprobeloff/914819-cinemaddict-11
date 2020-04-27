import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import {render, append, remove, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._cardFilmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onOpenPopupClick = this._onOpenPopupClick.bind(this);

    //append.bind(this._filmPopupComponent);
  }

  render(film) {
    // попытка реализовать скрытие всех попапов лишни
    const oldFilmComponent = this._cardFilmComponent;
    const oldFilmPopupComponent = this._filmPopupComponent;
    //

    this._cardFilmComponent = new CardFilmComponent(film);
    this._filmPopupComponent = new FilmPopupComponent(film);

    this._cardFilmComponent.setClickHandler(this._onOpenPopupClick);
    this._filmPopupComponent.setCloseButtonClickHandler(this._closePopup);

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

  setDefaultView() {

  }

  _onOpenPopupClick() {
    const bodyElement = document.querySelector(`body`);
    //Console.log(this._filmPopupComponent.get);
    append(bodyElement, this._filmPopupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    this._filmPopupComponent.removePopup();
    //this._filmPopupComponent.removeElement();
    //this._filmPopupComponent.removeElement();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
