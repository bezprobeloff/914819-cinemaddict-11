
import ShowMoreButtonComponent from "../components/button-show-more";
import NoFilmsComponent from "../components/no-films";
import CardFilmComponent from "../components/card-film";
import FilmPopupComponent from "../components/film-details";
import FilmListComponent from "../components/film-list";
import SectionFilmsComponent from "../components/section-films";
import SortFilmsComponent, {SortType} from "../components/sort-films";
import MovieController from "./movie";
import {render, append, remove, RenderPosition} from "../utils/render";

const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const renderFilms = (filmListContainer, films) => {
  // films.forEach((film) => {
  //   renderCardFilm(filmListContainer, film);
  // });
  return films.map((film) => {
    const movieController = new MovieController(filmListContainer);

    movieController.render(film);

    return movieController;
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

    this._films = [];
    this._showedMovieControllers = [];
    this._showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortFilmsComponent = new SortFilmsComponent();
    this._sectionFilmsComponent = new SectionFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsListComponent = new FilmListComponent(`All movies. Upcoming`, ``);
    this._filmListExtraTopRateComponent = new FilmListComponent(`Top rated movies`, `extra`);
    this._filmListExtraMostCommentComponent = new FilmListComponent(`Most commented`, `extra`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortFilmsComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

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

    //let showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;
    const newFilms = renderFilms(filmsListContainerElement, this._films.slice(0, this._showingFilmsCount));
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
    //renderFilms(filmsListContainerElement, films.slice(0, this._showingFilmsCount));

    this._renderShowMoreButton();
    //здесь вызывали функцию сортировку
    //this._sortFilmsComponent.setSortTypeChangeHandler((sortType) => {

    render(this._sectionFilmsComponent.getElement(), this._filmListExtraTopRateComponent, RenderPosition.BEFOREEND);
    render(this._sectionFilmsComponent.getElement(), this._filmListExtraMostCommentComponent, RenderPosition.BEFOREEND);

    // генерация карточек для доп блоков
    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      //renderCardFilm(filmsListTopRatedContainerElement, films[i]);
      //renderCardFilm(filmsListMostCommentContainerElement, films[i + 2]);
    }
  }

  _renderShowMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const filmListElement = this._filmsListComponent.getElement();
    render(filmListElement, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;
      const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

      //const sortedFilms = getSortedFilms(this._films, this._sortFilmsComponent.getSortType(), prevTasksCount, showingFilmsCount);

      //renderFilms(filmsListContainerElement, sortedFilms);
      //renderFilms(filmsListContainerElement, sortedFilms.slice(0, this._showingFilmsCount));
      const sortedFilms = getSortedFilms(this._films, this._sortFilmsComponent.getSortType(), prevTasksCount, this._showingFilmsCount);
      const newFilms = renderFilms(filmsListContainerElement, sortedFilms);

      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_FILMS_BY_BUTTON_COUNT;
    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);
    const filmsListContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    filmsListContainerElement.innerHTML = ``;

    //renderFilms(filmsListContainerElement, sortedFilms);
    const newFilms = renderFilms(filmsListContainerElement, sortedFilms);
    this._showedMovieControllers = newFilms;

    this._renderShowMoreButton();
  }

}
