import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkUpButton(curPage, button) {
    return `
      <button data-goto="${
        button === 'next' ? curPage + 1 : curPage - 1
      }" class="btn--inline pagination__btn--${button}">
        <span>Page ${button === 'next' ? curPage + 1 : curPage - 1}</span>
        <svg class="search__icon">
            <use href="${icons}}#icon-arrow-${
      button === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
      </button>`;
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are other Pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkUpButton(curPage, 'next');
    }

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkUpButton(curPage, 'prev');
    }

    //Other Pages

    if (curPage < numPages) {
      return `${this._generateMarkUpButton(
        curPage,
        'prev'
      )}${this._generateMarkUpButton(curPage, 'next')}`;
    }

    //Page 1 and there are no Other Pages
    return '';
  }
}

export default new PaginationView();
