import AbstractComponent from "../components/abstract-component";

const CONTROLS = [
  `watchlist`,
  `watched`,
  `favorite`
];

const EMOJIS = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

const createDetailsMarkup = (term, cell) => {
  if (term === `Genre` && cell.length > 1) {
    term = `Genres`;
    cell = cell
      .slice()
      .map((item) => `<span class="film-details__genre">${item}</span>`)
      .join(`\n`);
  }
  return (
    `
    <tr class="film-details__row">
      <td class="film-details__term">${term}</td>
      <td class="film-details__cell">${cell}</td>
    </tr>
    `
  );
};

const createControlsMarkup = (name) => {
  let labeltext = `Add to ${name}`;
  if (name === `watched`) {
    labeltext = `Already ${name}`;
  } else if (name === `favorite`) {
    labeltext = labeltext + `s`;
  }

  return (
    `
    <input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}">
    <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${labeltext}</label>
    `
  );
};

const createCommentsMarkUp = (comment) => {
  const {emoji, text, author, day} = comment;
  return (
    `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji-${emoji.match(/.*\/(.*?)\..*/i)[1]}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${day}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    `
  );
};

const createEmojiMarkup = (emojiPath) => {
  const emojiName = emojiPath.match(/.*\/(.*?)\..*/i)[1];
  return (
    `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiName}" value="${emojiName}">
    <label class="film-details__emoji-label" for="emoji-${emojiName}">
      <img src="${emojiPath}" width="30" height="30" alt="emoji">
    </label>
    `
  );
};

const createFilmDetailsTemplate = (film) => {
  const {title, rate, year, duration, genres, poster, description,
    ageRate, titleOriginal, director, writers, actors,
    releaseDate, country, comments} = film;
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRate}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${titleOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rate}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${createDetailsMarkup(`Director`, director)}
                ${createDetailsMarkup(`Writers`, writers)}
                ${createDetailsMarkup(`Actors`, actors)}
                ${createDetailsMarkup(`Release Date`, releaseDate)}
                ${createDetailsMarkup(`Runtime`, duration)}
                ${createDetailsMarkup(`Country`, country)}
                ${createDetailsMarkup(`Genre`, genres)}
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${CONTROLS.map((item) => createControlsMarkup(item)).join(`\n`)}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${comments.map((item) => createCommentsMarkUp(item)).join(`\n`)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${EMOJIS.map((item) => createEmojiMarkup(item)).join(`\n`)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  // удалим только разметку, сам элемент не будем обнулять
  removePopup() {
    this.getElement().parentElement
    .removeChild(this.getElement());
  }

  setClickHandler(handler) {
    this.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
