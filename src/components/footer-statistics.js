import AbstractComponent from "../components/abstract-component";

const createFooterStatistics = (sumFilms) => {
  return (
    `<p>${sumFilms} movies inside</p>`
  );
};

export default class FooterStats extends AbstractComponent {
  constructor(sumFilms) {
    super();
    this._sumFilms = sumFilms;
  }

  getTemplate() {
    return createFooterStatistics(this._sumFilms);
  }
}
