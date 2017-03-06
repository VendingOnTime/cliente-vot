import { ClienteVotPage } from './app.po';

describe('cliente-vot App', () => {
  let page: ClienteVotPage;

  beforeEach(() => {
    page = new ClienteVotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
