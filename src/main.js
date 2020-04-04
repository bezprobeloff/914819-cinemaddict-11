import {createButtonShowMoreTemplate} from "./components/button-show-more";
import {createCardFilmTemplate} from "./components/card-film";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createFilmsListTemplate} from "./components/film-list";
import {createFilmsListExtraTemplate} from "./components/film-list-extra";
import {createMainNavigationTemplate} from "./components/main-navigate";
import {createProfileTemplate} from "./components/profile";
import {createSectionFilmsTemplate} from "./components/section-films";
import {createSortFilmsTemplate} from "./components/sort-films";

const FILMS_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;
const FILMS_LIST_EXTRA_COUNT = 2;

const bodyElement = document.querySelector(`body`);
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(headerElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortFilmsTemplate(), `beforeend`);

render(siteMainElement, createSectionFilmsTemplate(), `beforeend`);
const sectionFilmsElement = siteMainElement.querySelector(`.films`);

render(sectionFilmsElement, createFilmsListTemplate(), `beforeend`);

const filmsListElement = sectionFilmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainerElement, createCardFilmTemplate(), `beforeend`);
}

render(filmsListElement, createButtonShowMoreTemplate(), `beforeend`);


for (let i = 0; i < FILMS_LIST_EXTRA_COUNT; i++) {
  render(sectionFilmsElement, createFilmsListExtraTemplate(), `beforeend`);
  const filmsListExtraElement = sectionFilmsElement.querySelectorAll(`.films-list--extra`).item(i);
  const filmsListExtraContainerElement = filmsListExtraElement.querySelector(`.films-list__container`);

  for (let j = 0; j < FILMS_EXTRA_COUNT; j++) {
    render(filmsListExtraContainerElement, createCardFilmTemplate(), `beforeend`);
  }
}

render(bodyElement, createFilmDetailsTemplate(), `beforeend`);
