import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const ProductListFilters = ({ onChange }) => {
  const [name, setName] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);

  const debouncedName = useDebounce(name, 150);
  // ne direktben ezt csináljad, nem hatékony, onchange mindig lefut, amikor gépelsz, delayelni akarod
  useEffect(() => {
    onChange({ name: debouncedName, category, maxPrice });
  }, [debouncedName, category, maxPrice]);
  // manage all filtering logic
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor="">Product name</label>
      <input
        type="text"
        name="product-name"
        id="product-name"
        value={name}
        placeholder="search products..."
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="">Category</label>
      <select
        name=""
        id=""
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="first">First</option>
        <option value="second">Second</option>
        <option value="third">Third</option>
      </select>
      <label htmlFor="">Max price</label>
      <select
        name=""
        id=""
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(e.target.value ? parseInt(e.target.value, 10) : undefined)
        }
      >
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="1000">1000</option>
      </select>
    </div>
  );
};

export default ProductListFilters;
