import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const ProductListFilters = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(-1);

  const debouncedSearch = useDebounce(search, 150);
  // ne direktben ezt csináljad, nem hatékony, onchange mindig lefut, amikor gépelsz, delayelni akarod
  useEffect(() => {
    onChange({ search: debouncedSearch });
  }, [debouncedSearch]);
  // manage all filtering logic
  return (
    <>
      <input
        type="text"
        name="product-name"
        id="product-name"
        value={search}
        placeholder="search products..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};

export default ProductListFilters;
