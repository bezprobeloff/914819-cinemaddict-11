import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import {render, append, remove, RenderPosition} from "../utils/render";

export default class MovieController {
  constructor(container) {
    this._container = container;

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
