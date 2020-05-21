import PageController from "./controllers/page";
import ProfileComponent from "./components/profile";
import FooterStatsComponent from "./components/footer-statistics";
import MainNavigationComponent from "./components/main-navigate";
//import FilterComponent from "./components/filter";
import FilterController from "./controllers/filter";
import FilmsModel from "./models/movies";
import {generateFilms} from "./components/mock/film";
import {render, append, remove, RenderPosition} from "./utils/render";

const FILMS_COUNT = 23;
const COUNT_WATCHED_FILMS = 13;

const films = generateFilms(FILMS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const headerElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer__statistics`);
const profileComponent = new ProfileComponent(COUNT_WATCHED_FILMS);
const footerStatsComponent = new FooterStatsComponent(films.length);
const pageController = new PageController(siteMainElement, filmsModel);
const mainNavigationComponent = new MainNavigationComponent();
//const filterComponent = new FilterComponent(films);



render(headerElement, profileComponent, RenderPosition.BEFOREEND);
//render(siteMainElement, mainNavigationComponent, RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();
//render(mainNavigationComponent.getElement(), filterComponent, RenderPosition.AFTERBEGIN);

pageController.render(films);
render(footerElement, footerStatsComponent, RenderPosition.BEFOREEND);
