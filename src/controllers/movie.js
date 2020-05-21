import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import {render, append, remove, replace, RenderPosition} from "../utils/render";

const PopupState = {
  OPEN: true,
  CLOSE: false
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._popupState = PopupState.CLOSE;

    this._cardFilmComponent = null;
    this._filmPopupComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onOpenPopupClick = this._onOpenPopupClick.bind(this);

    // append.bind(this._filmPopupComponent);
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
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    // render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
    if (oldFilmComponent && oldFilmPopupComponent) {
      replace(this._cardFilmComponent, oldFilmComponent);
      replace(this._filmPopupComponent, oldFilmPopupComponent);
    } else {
      render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._popupState !== PopupState.CLOSE) {
      this._closePopup();
    }
  }

  _onOpenPopupClick() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);
    append(bodyElement, this._filmPopupComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._popupState = PopupState.OPEN;
  }

  destroy() {
    remove(this._cardFilmComponent);
    remove(this._filmPopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    this._filmPopupComponent.reset();
    this._filmPopupComponent.removePopup();
    this._popupState = PopupState.CLOSE;
    // this._filmPopupComponent.removeElement();
    // this._filmPopupComponent.removeElement();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
