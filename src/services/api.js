export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await request.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const request = await fetch(`https://api.mercadolibre.com/sites/MLB/request?category=${categoryId}_ID&q=${query}`);
  const data = request.json();
  return data;
}
