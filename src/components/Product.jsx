import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
/**
 * 商品组件
 * @returns
 */
function ProductRow({ product }) {
  const name = product.stocked ? (
    <span style={{ color: "red" }}>{product.name}</span>
  ) : (
    product.name
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
/**
 * 商品类别组件
 * @param {*} param0
 * @returns
 */
function ProductCategoryRow({ category }) {
  return (
    <tr colSpan="2">
      <th>{category}</th>
    </tr>
  );
}
/**
 * 搜索框
 * @returns
 */
function SearchBar({ filterText, setFilterText, inStockOnly, setInStockOnly }) {
  return (
    <>
      <input
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
        />{" "}
        Only show products in stock
      </p>
    </>
  );
}
/**
 * 商品表格组件
 * @returns
 */
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;
  let filterProducts = [];
  if (inStockOnly) {
    filterProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(filterText.toLowerCase()) &&
        inStockOnly
      );
    });
  }else{
    filterProducts = products.map((product) => {
        product.stocked = false;
      if (!!filterText.trim() && product.name.toLowerCase().includes(filterText.toLowerCase())) {
        product.stocked = true;
    }
    return product;
    });
  }
  filterProducts.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />,
      );
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} key={product.name} />);
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}
/**
 * 商品组件
 * @returns
 */
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  console.log("🚀 ~ FilterableProductTable ~ inStockOnly:", inStockOnly);

  return (
    <>
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}
function Product() {
  return (
    <>
      <FilterableProductTable products={PRODUCTS} />
    </>
  );
}

export default Product;
