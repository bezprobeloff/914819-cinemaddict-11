import ShowMoreButtonComponent from "./components/button-show-more";
import NoFilmsComponent from "./components/no-films";
import CardFilmComponent from "./components/card-film";
import FilmPopupComponent from "./components/film-details";
import FilmListComponent from "./components/film-list";
import MainNavigationComponent from "./components/main-navigate";
import ProfileComponent from "./components/profile";
import SectionFilmsComponent from "./components/section-films";
import SortFilmsComponent from "./components/sort-films";
import FooterStatsComponent from "./components/footer-statistics";
import {generateFilms} from "./components/mock/film";
import {render, append, remove, RenderPosition} from "./utils/render";

const FILMS_COUNT = 23;
const SHOWING_FILMS_ON_START_COUNT = 5;
const SHOWING_FILMS_BY_BUTTON_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;
const COUNT_WATCHED_FILMS = 13;

const renderCardFilm = (filmListContainer, film) => {
  const onOpenPopupClick = () => {
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

const renderSectionFilms = (sectionFilmsComponent, films) => {
  const isNoFilms = (films.length === 0);

  if (isNoFilms) {
    render(sectionFilmsComponent.getElement(), new NoFilmsComponent(), RenderPosition.BEFOREEND);
    return;
  }

  const filmsListComponent = new FilmListComponent(`All movies. Upcoming`, ``);
  const filmListExtraTopRateComponent = new FilmListComponent(`Top rated movies`, `extra`);
  const filmListExtraMostCommentComponent = new FilmListComponent(`Most commented`, `extra`);
  const filmsListContainerElement = filmsListComponent.getElement().querySelector(`.films-list__container`);
  const filmsListTopRatedContainerElement = filmListExtraTopRateComponent.getElement().querySelector(`.films-list__container`);
  const filmsListMostCommentContainerElement = filmListExtraMostCommentComponent.getElement().querySelector(`.films-list__container`);
  const showMoreButtonComponent = new ShowMoreButtonComponent();

  render(sectionFilmsComponent.getElement(), filmsListComponent, RenderPosition.BEFOREEND);

  let showingFilmsCount = SHOWING_FILMS_ON_START_COUNT;

  films.slice(0, showingFilmsCount)
    .forEach((film) => renderCardFilm(filmsListContainerElement, film));

  render(filmsListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);
  showMoreButtonComponent.setClickHandler(() => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_BY_BUTTON_COUNT;

    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((film) => renderCardFilm(filmsListContainerElement, film));

    if (showingFilmsCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });

  render(sectionFilmsComponent.getElement(), filmListExtraTopRateComponent, RenderPosition.BEFOREEND);
  render(sectionFilmsComponent.getElement(), filmListExtraMostCommentComponent, RenderPosition.BEFOREEND);

  // генерация карточек для доп блоков
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    renderCardFilm(filmsListTopRatedContainerElement, films[i]);
    renderCardFilm(filmsListMostCommentContainerElement, films[i + 2]);
  }
};

const films = generateFilms(FILMS_COUNT);

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);
const profileComponent = new ProfileComponent(COUNT_WATCHED_FILMS);
const footerStatsComponent = new FooterStatsComponent(films.length);

render(siteMainElement, new MainNavigationComponent(films), RenderPosition.BEFOREEND);
render(siteMainElement, new SortFilmsComponent(), RenderPosition.BEFOREEND);

const sectionFilmsComponent = new SectionFilmsComponent();
render(siteMainElement, sectionFilmsComponent, RenderPosition.BEFOREEND);
renderSectionFilms(sectionFilmsComponent, films);

render(headerElement, profileComponent, RenderPosition.BEFOREEND);
render(footerElement, footerStatsComponent, RenderPosition.BEFOREEND);
