import { css, CSSResult, html, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import * as Util from '../service/utility';
import { searchGrocery } from '../service/search-service';
import { DisplayMixin } from '../service/DisplayMixin';

export class View extends DisplayMixin(LitElement) {
  searchedGroceryList: Array<Grocery> = [];
  selectedGroceryDetail!: Grocery;

  static get styles(): CSSResult {
    return css`
      input[type='search'] {
        height: 2.5em;
        width: 27em;
        font-size: medium;
        font-family: cursive;
      }

      button {
        height: 2.5em;
        width: 6.6em;
        font-size: medium;
        font-family: cursive;
      }

      input[type='search']::-webkit-search-decoration,
      input[type='search']::-webkit-search-cancel-button,
      input[type='search']::-webkit-search-results-button,
      input[type='search']::-webkit-search-results-decoration {
        -webkit-appearance: none;
      }
    `;
  }

  set state(_state: any) {
    this.updateView(true);
  }

  constructor() {
    super();
    this.updateView(false);
  }

  setSearchInputValue(searchQuery: string) {
    const searchInput = this.findElement('#grocerySearch') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = searchQuery;
    }
  }

  getSearchInputValue() {
    const searchInput = this.findElement('#grocerySearch') as HTMLInputElement;
    return searchInput.value;
  }

  updateView(fromUrlChange: boolean) {
    if (Util.isSearchScreen()) {
      this.performSearch(Util.getSearchQuery());
      this.updateSearchField();
    } else if (Util.isDetailScreen()) {
      this.renderGroceryDetail(fromUrlChange);
    } else {
      this.renderResult([]);
      this.setSearchInputValue('');
    }
  }

  async updateSearchField() {
    await 0;
    await 0;
    const searchInput = this.findElement('#grocerySearch') as HTMLInputElement;
    searchInput.value = Util.getSearchQuery();
  }

  async renderGroceryDetail(fromUrlChange: boolean) {
    const groceryList = await searchGrocery(Util.getDetailScreenGroceryName());
    const showDetailEvent = new CustomEvent(`grocery-details`, {
      detail: {
        grocery: groceryList[0],
      },
      composed: true,
      bubbles: true,
      cancelable: true,
    });
    this.showGroceryDetail(showDetailEvent, fromUrlChange);
  }

  async keypressHandler(event: KeyboardEvent) {
    const searchVal = this.getSearchInputValue();
    const searchQuery = `${searchVal}${event.key}`;
    this.searchInputAction(searchQuery);
  }

  async keyupHandler(event: KeyboardEvent) {
    const { key } = event;
    if (key.toUpperCase() === Util.BACKSPACE_NAME) {
      const searchQuery = this.getSearchInputValue();
      this.searchInputAction(searchQuery);
    }
  }

  async searchInputAction(searchQuery: string) {
    this.performSearch(searchQuery);
    const qp = new URLSearchParams(window.location.search);
    qp.set('query', searchQuery);
    Util.addToHistory(null, '?' + qp.toString());
  }

  async performSearch(searchQuery: string) {
    if (searchQuery && Util.ALPHABET_REGEX.test(searchQuery)) {
      const groceryList: Array<Grocery> = await searchGrocery(searchQuery);
      this.renderResult(groceryList);
    } else {
      this.renderResult([]);
    }
  }

  renderResult(groceryList: Array<Grocery>) {
    this.searchedGroceryList = groceryList;
    this.show('#searchContainer');
    this.hide('#detailContainer');
    this.requestUpdate();
  }

  showGroceryDetail(event: CustomEvent, fromUrlChange: boolean) {
    this.selectedGroceryDetail = event.detail.grocery as Grocery;
    if (!fromUrlChange) {
      Util.addToHistory(
        this.selectedGroceryDetail,
        '/grocery/' + this.selectedGroceryDetail.name.toString(),
      );
    }
    this.hide('#searchContainer');
    this.show('#detailContainer');
    this.requestUpdate();
  }

  render() {
    return html`
      <div id="searchContainer">
        <form action="#">
          <input
            type="search"
            id="grocerySearch"
            name="groceryName"
            aria-label="Search through grocery list"
            @keypress="${this.keypressHandler}"
            @keyup="${this.keyupHandler}"
          />
          <button type="button">Search</button>
        </form>
        <div class="column left">
          ${repeat(
            this.searchedGroceryList,
            grocery =>
              html`
                <grocery-view
                  .grocery="${grocery}"
                  @grocery-details="${this.showGroceryDetail}"
                ></grocery-view>
              `,
          )}
        </div>
      </div>
      <div id="detailContainer" class="column right">
        ${this.selectedGroceryDetail
          ? html`
              <grocery-detail-view
                .grocery="${this.selectedGroceryDetail}"
              ></grocery-detail-view>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('my-view', View);
