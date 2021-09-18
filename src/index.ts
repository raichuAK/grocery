// CSS imported here will be bundled by webpack
import './index.css';
// You can import any components here
import './components/my-component';
import './components/grocery-view';
import './components/grocery-detail-view';
import { View } from './components/my-component';

window.addEventListener('popstate', event => {
  const viewElement: View = (document.getElementsByTagName(
    'my-view',
  )[0] as unknown) as View;
  viewElement.state = event.state;
});
