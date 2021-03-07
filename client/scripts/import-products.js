const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const categories = [
  {
    id: 1,
    name: "mens fashion",
    uri: "mens-fashion",
  },
  {
    id: 2,
    name: "womens fashion",
    uri: "womens-fashion",
  },
  {
    id: 3,
    name: "shoes",
    uri: "mens-shoes",
  },
  {
    id: 4,
    name: "perfumes",
    uri: "fragrances-allgenders",
  },
  {
    id: 5,
    name: "bags",
    uri: "womens-bags",
  },
];

async function getProductsByCategory(cat) {
  console.log("importing category", cat.name);
  const { data } = await axios.get(`https://www.jumia.com.ng/${cat.uri}`, {
    headers: { accept: "application/json" },
  });

  return data.viewData.products.slice(0, 5).map((p) => ({
    id: p.sku,
    categoryId: cat.id,
    name: p.name,
    price: Number(p.prices.rawPrice),
    imageUrl: p.image,
  }));
}

(async () => {
  const store = { products: [] };
  for (let cat of categories) {
    const products = await getProductsByCategory(cat);
    store.products.push(...products);
  }
  store.categories = categories.map(({ uri, ...fields }) => fields);
  const filePath = path.resolve(__dirname, "../src/store.json");
  await fs.writeFile(filePath, JSON.stringify(store));
  console.log("products imported");
})();
