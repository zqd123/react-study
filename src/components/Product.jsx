const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ]
/**
 * 商品组件
 * @returns 
 */
function ProductRow({product}){
    const name = product.stocked ?
    <span style={{color:'red'}}>{product.name}</span>:product.name
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}
function Product(){

    return (
        <>
        <input placeholder="Searce..."></input>
        <div>123</div>
        <table>

        <ProductRow product={PRODUCTS[0]}/>
        </table>
        </>
    )
}

export default Product