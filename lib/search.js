export async function searchFor(term) {
  const url = new URL('https://api.mercadolibre.com/sites/MLA/search');
  url.search = new URLSearchParams({ q: term }).toString();

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      author: {
        name: "Lucas", lastname: "Marques"
      },
      categories: buildCategories(data.results),
      items: buildItems(data.results),
    }
  } catch (err) {
    console.error(`Failed to fetch search results: ${err}`);
    return {
      results: [],
    };
  }
}

function buildItems(results) {
  return results.map(item => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Number(item.price.toString().split('.')[0]),
      decimals: Number(item.price.toString().split('.')[1]) || 0,
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  }));
}

function buildCategories(results) {
  const categories = new Set();
  results.forEach(item => categories.add(item.category_id));
  return [ ...categories ]
}
