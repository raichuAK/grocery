import { css, html, LitElement } from 'lit-element';

class GroceryView extends LitElement {
  grocery!: Grocery;

  static get styles() {
    return css`
      .groceryRow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1em;
        border-style: ridge;
      }

      button {
        height: 1.5em;
        width: 7em;
        font-size: medium;
        font-family: cursive;
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

  showDetails() {
    const showDetailEvent = new CustomEvent(`grocery-details`, {
      detail: {
        grocery: this.grocery,
      },
      composed: true,
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(showDetailEvent);
  }

  render() {
    return html`
      <div class="groceryRow">
        <span>${this.grocery?.name}</span
        ><button @click="${this.showDetails}">View Details</button>
      </div>
    `;
  }
}

customElements.define('grocery-view', GroceryView);
