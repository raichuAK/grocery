import '../src/components/my-component';
import { html, fixture, expect } from '@open-wc/testing';
import { View } from '../src/components/my-component';

describe('view component', () => {
  let el: View;
  beforeEach(async () => {
    el = ((await fixture(
      html`
        <my-view .state=""></my-view>
      `,
    )) as unknown) as View;
  });
  it('is loaded successfully', async () => {
    expect(el).to.be.not.undefined;
  });

  it('passes the a11y audit', async () => {
    await expect(el).shadowDom.to.be.accessible();
  });

  describe('When alphabet search key is pressed', () => {
    it('with matching value', async () => {
      (el.findElement('#grocerySearch') as HTMLInputElement).value = 'a';
      const event = new KeyboardEvent('keypress', {
        key: 'a',
      });
      el.keypressHandler(event);
      await 0;
      await el.updateComplete;
      expect(el.searchedGroceryList.length).to.equal(0);
    });

    it('without matching search query', async () => {
      (el.findElement('#grocerySearch') as HTMLInputElement).value = '';
      const event = new KeyboardEvent('keypress', {
        key: 'a',
      });
      el.keypressHandler(event);
      await 0;
      await el.updateComplete;
      expect(el.searchedGroceryList.length).to.equal(8);
    });
  });
  it('with backspace key pressed', async () => {
    (el.findElement('#grocerySearch') as HTMLInputElement).value = 'c';
    const event = new KeyboardEvent('keyup', {
      key: 'Backspace',
    });
    el.keyupHandler(event);
    await 0;
    await el.updateComplete;
    expect(el.searchedGroceryList.length).to.equal(4);
  });
});
