
import ShowMoreButtonComponent from "../components/button-show-more";
import NoFilmsComponent from "../components/no-films";
import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import FilmListComponent from "../components/film-list";
import SectionFilmsComponent from "../components/section-films";
import SortFilmsComponent, {SortType} from "../components/sort-films";
import MovieController from "../controllers/movie";
import {render, append, remove, RenderPosition} from "../utils/render";

const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const renderFilms = (filmListContainer, films) => {
  films.forEach((film) => {
    renderCardFilm(filmListContainer, film);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.RATE_UP:
      sortedFilms = showingFilms.sort((a, b) => b.rate - a.rate);
      break;
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }

  return sortedFilms.slice(from, to);
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

    renderFilms(filmsListContainerElement, films.slice(0, showingFilmsCount));

    renderShowMoreButton();
    //здесь вызывали функцию сортировку
    //this._sortFilmsComponent.setSortTypeChangeHandler((sortType) => {

    render(this._sectionFilmsComponent.getElement(), this._filmListExtraTopRateComponent, RenderPosition.BEFOREEND);
    render(this._sectionFilmsComponent.getElement(), this._filmListExtraMostCommentComponent, RenderPosition.BEFOREEND);

    // генерация карточек для доп блоков
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      renderCardFilm(filmsListTopRatedContainerElement, films[i]);
      renderCardFilm(filmsListMostCommentContainerElement, films[i + 2]);
    }
  }

  _renderShowMoreButton() {
    if (showingFilmsCount >= films.length) {
      return;
    }
    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

      const sortedFilms = getSortedFilms(films, this._sortFilmsComponent.getSortType(), prevTasksCount, showingFilmsCount);

      renderFilms(filmsListContainerElement, sortedFilms);

      if (showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
    const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

    filmsListContainerElement.innerHTML = ``;

    renderFilms(filmsListContainerElement, sortedFilms);

    renderShowMoreButton();
  }

}
