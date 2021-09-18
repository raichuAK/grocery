import { css, html, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

class GroceryDetailView extends LitElement {
  grocery!: Grocery;

  static get styles() {
    return css`
      input[type='search'] {
        height: 2.5em;
        width: 25em;
        font-size: medium;
        font-family: cursive;
      }

      button {
        height: 2.5em;
        width: 5em;
        font-size: medium;
        font-family: cursive;
      }

      .displayBreak {
        word-wrap: break-word; /* IE 5.5-7 */
        white-space: pre-line;
      }

      hr {
        border-style: dashed;
      }

      .imageDisplay {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `;
  }

  static get properties() {
    return {
      grocery: {
        type: Object,
      },
    };
  }

  render() {
    return html`
      <div class="card">
        <h3>${this.grocery?.name}</h3>
        <p>${this.grocery?.description}</p>
        ${this.grocery?.additionalInformation
          ? html`
              <hr />
              <div class="displayBreak">
                ${unsafeHTML(this.grocery.additionalInformation)}
              </div>
            `
          : ''}
        ${this.grocery?.images
          ? html`
              <hr />
              <div class="imageDisplay">
                ${repeat(
                  this.grocery.images,
                  imgSrc =>
                    html`
                      <img src="${imgSrc}" />
                    `,
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('grocery-detail-view', GroceryDetailView);
