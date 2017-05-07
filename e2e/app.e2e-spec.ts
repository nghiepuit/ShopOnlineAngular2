import { ShopOnlinePage } from './app.po';

describe('shop-online App', () => {
  let page: ShopOnlinePage;

  beforeEach(() => {
    page = new ShopOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
