import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const HeaderNav = () => {
    const { cartList } = useStateContext();
    const totalCartItems = cartList.length
    return (
        <div className='flex justify-between bg-gray-200 px-10 p-4 w-[100vw]'>
            <Link to="/">
                <p className="font-semibold">TeeRex Store</p>
            </Link>
            <div className="flex gap-x-2 relative">
                <Link to='/cart'>
                    <AiOutlineShoppingCart className='text-2xl hover:text-green-600' />
                </Link>
                <p className="font-semibold">{totalCartItems}</p>
            </div>
        </div>
    )
}

export default HeaderNav