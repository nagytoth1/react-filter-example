import ProductList from "./components/ProductList";
import { useQuery } from "@tanstack/react-query";
import products from "./api/products";
import ProductListFilters from "./components/ProductListFilters";
import { useState } from "react";

const fetchProducts = async ({ category, maxPrice, name }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === category;
    });
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.price <= maxPrice;
    });
  }

  if (name) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  return filteredProducts;
};
// new custom component just for the filters, send data of filters back to the App component
function App() {
  const [name, setName] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  const { data: products, isFetching } = useQuery({
    queryKey: ["products", { name, category, maxPrice }],
    queryFn: () => fetchProducts({ name, category, maxPrice }),
  });
  const handleChange = ({ name, category, maxPrice }) => {
    console.debug("fetch");
    setName(name);
    setCategory(category);
    setMaxPrice(maxPrice);
  };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="text-4xl font-bold">Products</h1>
      </div>
      <ProductListFilters onChange={handleChange} />
      <div>{products && <ProductList products={products} />}</div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
}

export default App;
