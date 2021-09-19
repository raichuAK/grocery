export const DisplayMixin = (superclass: any) =>
  class extends superclass {
    show(selector: string): void {
      const elem = this.findElement(selector);
      if (elem) {
        elem.hidden = false;
      }
    }

    hide(selector: string): void {
      const elem = this.findElement(selector);
      if (elem) {
        elem.hidden = true;
      }
    }

    findElement(selector: string): HTMLElement {
      const elem = this.shadowRoot?.querySelector(selector)!;
      return elem as HTMLElement;
    }
  };
