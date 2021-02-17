console.log('Hello from 3navigation');
const modalCard = document.querySelector('.modalCard');
const backDropRef = document.querySelector('.js-modal');
const overlayRef = document.querySelector('.overlay');
const body = document.querySelector('body');

function activeDetailsPage(movie) {
  backDropRef.classList.add('is-open');
  body.classList.add('overflow-ishidden');
  showDetails(movie);
  window.addEventListener('keydown', onPressEscape);
  overlayRef.addEventListener('click', onBackDropClick);
  initModalDialogButton(moviesWatchedKeyName, 'btnModal-watched-js', movie);
  initModalDialogButton(moviesQueuedKeyName, 'btnModal-queue-js', movie);
}

function showDetails({
  poster_path: imgPath,
  title: filmTitle,
  vote_average: voteAverage,
  vote_count: voteCount,
  popularity: popularity,
  original_title: originalTitle,
  genre_ids: genre,
  overview: description,
  id: movieId,
}) {
  const modalCardinfo = `<img class="modalImg"
                    src='${basicPosterUrl}${imgPath}'
                    alt=${filmTitle}
                    />
                    <div class="description">
        <h2 class="modal_title">${filmTitle}</h2>
        <table>
<tr>
  <td class="definition">Vote/Votes</td>
  <td class="definition info"><span class="rating-modal">${voteAverage}</span> / ${voteCount}</td>
  </tr>
<tr>
  <td class="definition">Popularity</td>
  <td class="definition info">${popularity}</td>
</tr>
<tr>
  <td class="definition">Original Title</td>
  <td class="definition info originalTitle">${originalTitle}</td>
</tr>
<tr>
  <td class="definition">Genre</td>
  <td class="definition info">${genreStringModal(genre)}</td>
</tr>
</table>
<h2 class="about">ABOUT</h2>
<p class="overview">${description}</p>
<button id="btnModal-watched-js"
        data-id=${movieId}
        class="btn-modal">
  ${getButtonTitle(moviesWatchedKeyName, movieId)}
</button>

<button id="btnModal-queue-js"
        class="btn-modal"
        data-id=${movieId}>
  ${getButtonTitle(moviesQueuedKeyName, movieId)}
</button>

</>`;

  modalCard.insertAdjacentHTML('afterbegin', modalCardinfo);
}

//===========================================================================================================

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  backDropRef.classList.remove('is-open');
  body.classList.remove('overflow-ishidden');
  modalCard.innerHTML = '';
  body.classList.remove('overflow-ishidden');
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function genreStringModal(genre) {
  if (genre.length === 0) {
    return 'Other';
  }
  return genre
    .reduce((acc, el) => {
      return (
        acc +
        (genres.find(elem => {
          return elem.id === el;
        }).name || 'Other') +
        ', '
      );
    }, '')
    .slice(0, -2);
}
