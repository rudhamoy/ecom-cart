import React from 'react'
import { useStateContext } from '../context/ContextProvider'

const ProductCard = ({product}) => {

    const { setCartList, cartList } = useStateContext()

    const addToCart = (product) => {
        let checkProductExist = cartList.filter(i => i.id === product.id)
        if(checkProductExist.length > 0) {
            return cartList
        }
        return setCartList([...cartList, {...product, productQty: 1}])
    }

    return (
        <div className="w-[320px] sm:w-[200px]  bg-white border rounded-sm p-3 shadow-md">
            <img className='h-[180px]' src={product.imageURL} alt={product.name} />
            <p>{product.name}</p>
            <div className='flex justify-between my-2'>
                <p className='font-semibold'>Rs. {product.price}</p>
                <button onClick={() => addToCart(product)}>Add to cart</button>
            </div>
        </div>
    )
}

export default ProductCard