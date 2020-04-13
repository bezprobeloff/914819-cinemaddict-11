export const createFilmsListTemplate = (title, mod = ``) => {
  return (
    `<section class="films-list${(mod === `extra`) ? `--extra` : `` }">
      <h2 class="films-list__title${(mod === ``) ? ` visually-hidden` : `` }">${title}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};
