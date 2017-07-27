import { SiriusappPage } from './app.po';

describe('siriusapp App', () => {
  let page: SiriusappPage;

  beforeEach(() => {
    page = new SiriusappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
