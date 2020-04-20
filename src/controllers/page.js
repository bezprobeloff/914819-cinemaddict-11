
import ShowMoreButtonComponent from "../components/button-show-more";
import NoFilmsComponent from "../components/no-films";
import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import FilmListComponent from "../components/film-list";
import SectionFilmsComponent from "../components/section-films";
import SortFilmsComponent from "../components/sort-films";
import {render, append, remove, RenderPosition} from "../utils/render";

const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const renderCardFilm = (filmListContainer, film) => {
  const onOpenPopupClick = () => {
    const bodyElement = document.querySelector(`body`);
    append(bodyElement, popupFilmComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const closePopup = () => {
    popupFilmComponent.removePopup();
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      closePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
  const cardFilmComponent = new CardFilmComponent(film);
  const popupFilmComponent = new FilmPopupComponent(film);

  cardFilmComponent.setClickHandler(onOpenPopupClick);
  popupFilmComponent.setClickHandler(closePopup);

  render(filmListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._sortFilmsComponent = new SortFilmsComponent();
    this._sectionFilmsComponent = new SectionFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmListComponent(`All movies. Upcoming`, ``);
    this._filmListExtraTopRateComponent = new FilmListComponent(`Top rated movies`, `extra`);
    this._filmListExtraMostCommentComponent = new FilmListComponent(`Most commented`, `extra`);
  }

  render(films) {
    render(this._container, this._sortFilmsComponent, RenderPosition.BEFOREEND);
    render(this._container, this._sectionFilmsComponent, RenderPosition.BEFOREEND);

    const isNoFilms = (films.length === 0);

    if (isNoFilms) {
      render(this._sectionFilmsComponent.getElement(), this.NoFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    const filmsListTopRatedContainerElement = this._filmListExtraTopRateComponent.getElement().querySelector(`.films-list__container`);
    const filmsListMostCommentContainerElement = this._filmListExtraMostCommentComponent.getElement().querySelector(`.films-list__container`);

    render(this._sectionFilmsComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);

    let showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;

    films.slice(0, showingFilmsCount)
      .forEach((film) => renderCardFilm(filmsListContainerElement, film));

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

      films.slice(prevTasksCount, showingFilmsCount)
        .forEach((film) => renderCardFilm(filmsListContainerElement, film));

      if (showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });

    render(this._sectionFilmsComponent.getElement(), this._filmListExtraTopRateComponent, RenderPosition.BEFOREEND);
    render(this._sectionFilmsComponent.getElement(), this._filmListExtraMostCommentComponent, RenderPosition.BEFOREEND);

    // генерация карточек для доп блоков
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      renderCardFilm(filmsListTopRatedContainerElement, films[i]);
      renderCardFilm(filmsListMostCommentContainerElement, films[i + 2]);
    }
  }

}
