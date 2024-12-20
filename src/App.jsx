import ProductList from "./components/ProductList";
import { useQuery } from "@tanstack/react-query";
import products from "./api/products";
import ProductListFilters from "./components/ProductListFilters";
import { useState } from "react";

const fetchProducts = async ({ category, maxPrice, search }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let filteredProducts = products;

  // if (options?.category) {
  //   filteredProducts = filteredProducts.filter((product) => {
  //     return product.category === options.category;
  //   });
  // }

  // if (options?.maxPrice) {
  //   filteredProducts = filteredProducts.filter((product) => {
  //     return product.price <= (options.maxPrice);
  //   });
  // }

  if (search) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return filteredProducts;
};
// new custom component just for the filters, send data of filters back to the App component
function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(-1);
  const { data: products, isFetching } = useQuery({
    // queryKey: ["products", { category, maxPrice, search }],
    queryKey: ["products", { search }],
    queryFn: () => fetchProducts({ search }),
  });
  const handleChange = ({ search }) => {
    console.debug("fetch");
    setSearch(search);
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
