import {createElement} from "../utils";
import AbstractComponent from "../components/abstract-component";

const createSectionFilmsTemplate = () => {
  return (
    `<section class="films"/>`
  );
};

export default class SectionFilms extends AbstractComponent {
  getTemplate() {
    return createSectionFilmsTemplate();
  }
}
