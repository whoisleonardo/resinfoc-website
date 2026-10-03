import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ContentProvider } from '../content/ContentContext.jsx';
import NossosProdutos from './NossosProdutos.jsx';

describe('NossosProdutos', () => {
  it('renders the product archive empty state when no products exist', () => {
    const html = renderToStaticMarkup(
      <MemoryRouter><ContentProvider><NossosProdutos /></ContentProvider></MemoryRouter>
    );

    expect(html).toMatch(/Nenhum produto sonoro cadastrado ainda\./);
  });
});
