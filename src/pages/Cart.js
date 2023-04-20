import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { MdOutlineArrowRightAlt } from 'react-icons/md'

const Cart = () => {
    const [error, setError] = useState('')
    const { cartList, setCartList } = useStateContext()

    // count the total amount of price from cart list
    let priceCollection = []

    cartList.map(product => {
        priceCollection.push(product.price * product.productQty)
    });

    let totalAmount = priceCollection.length > 0 ? priceCollection.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;

    // delete cart item by id
    const deleteCartItem = (id) => {
        const deleteById = cartList.filter(item => item.id !== id);
        setCartList(deleteById)
    }

    // on change input handler for product qty 
    const onQtyChange = (num, id) => {
        setCartList([...cartList.map((product, index) => {

            if (product.id === id && (num <= product.quantity && num > 0)) {
                setError('')
                return { ...product, productQty: parseInt(num) }
            } 
            else if (product.id === id && (num > product.quantity)) {
                // when user try to update more than stock number
                setError('Product Quantity Cannot exceed more than stock quantity')
                return { ...product, productQty: parseInt(product.quantity) }
            } 
            else if (product.id === id && ( num < 1)) {
                // when user try to update less than 1
                setError('Product Quantity Cannot be less than One')
                return { ...product, productQty: parseInt(1) }
            }
            return product
        })])
    }

    return (
        <div className='max-w-xs sm:max-w-lg mx-auto flex flex-col gap-y-5 mt-10 '>
            {/* show error message here */}
            <div className=" h-[25px]">
                {error !== '' && (
                    <p className="bg-red-200 text-sm p-1 rounded-sm">{error}</p>
                )}
            </div>

            {cartList.length > 0 && cartList.map((cartItem, index) => (
                <>

                    <div
                        key={cartItem.id}
                        className="flex items-center gap-x-5 my-5 text-xs sm:text-base"
                    >
                        <div className="border rounded-sm p-1">
                            <img src={cartItem.imageURL} className="h-[50px]" />
                        </div>
                        <div className="font-semibold">
                            <p>{cartItem.name}</p>
                            <p>Rs. {cartItem.price}</p>
                        </div>
                        <div className='flex gap-x-1 rounded-sm bg-gray-100 p-2 w-[90px] sm:w-[100px]'>
                            <p>Qty</p>
                            <input 
                            // value={cartItem.productQty} 
                            defaultValue={cartItem.productQty} 
                            onChange={(e) => onQtyChange(e.target.value, cartItem.id)} 
                            type="number" className="w-[40px] sm:w-[50px] outline-none px-1" 
                            />
                        </div>

                        <button 
                        onClick={() => deleteCartItem(cartItem.id)} 
                        className='bg-gray-100 rounded-sm border p-1 px-2'>delete</button>
                    </div>
                </>
            ))}

            {/* hide amount when no items */}
            {totalAmount !== 0 ? (
                <div className='border-t-2'>
                    <div className="flex gap-x-10">
                        <p className='font-semibold'>Total Amount: </p>
                        <p>Rs. {totalAmount}</p>
                    </div>
                </div>
            ) : (
                <div className="mt-10 bg-green-100 p-2 flex justify-between px-4 text-sm rounded-sm">
                    <p className=''>Start Adding Items to Cart</p>
                    <Link to="/" className="flex gap-x-2 items-center">
                        <p>Add Now</p>
                        <MdOutlineArrowRightAlt />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cart