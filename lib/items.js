export async function fetchItem(id) {
  const [item, description] = await Promise.all([fetchItemById(id), fetchDescription(id)]);

  if (item === null || description === null) return null;

  const condition = item.attributes.find(attr => attr.id == "ITEM_CONDITION");

  return {
    author: {
      name: "Lucas", lastname: "Marques"
    },
    item: {
      id: id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Number(item.price.toString().split('.')[0]),
        decimals: Number(item.price.toString().split('.')[1]) || 0,
      },
      picture: item.pictures[0].secure_url,
      condition: condition.value_name,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: description.plain_text,
    },
  };
}

async function fetchItemById(id) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    return response.json();
  } catch (err) {
    console.error(`Failed to fetch item ID ${id}: ${err}`);
    return null;
  }
}

async function fetchDescription(itemId) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${itemId}/description`);
    return response.json();
  } catch (err) {
    console.error(`Failed to fetch description for Item ${id}: ${err}`);
    return null;
  }
}