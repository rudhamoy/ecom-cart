import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import SidebarFilter from '../components/Sidebar'
import { useStateContext } from '../context/ContextProvider'
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Homepage = () => {
    const [query, setQuery] = useState('')
    const [showFilter, setShowFilter] = useState(false)


    const { products } = useStateContext()

    const ref = useOutsideClick(() => setShowFilter(false))

    const searchKeys = ['type', 'color', 'name']
    const searchFilteredProduct = products.filter(product => {
        return searchKeys.some(key => product[key].toString()
            .toLowerCase().indexOf(query.toLowerCase()) > -1)

    })

    return (
        <div className='p-10 w-[100vw] relative'>
            {/* header */}
            <div className='flex justify-around'>
                {/* sidebar */}
                <div className="hidden sm:block">
                <SidebarFilter />
                </div>

                <div className="ml-0 sm:ml-[30%]">
                {/* search and filter */}
                    <div className="my-10 flex items-center gap-x-2 h-[20px] ">
                        <input
                            value={query}
                            type="text"
                            placeholder='search for products'
                            className='outline-none border-b-2 p-1 w-[200px] sm:w-[300px] rounded-sm'
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="p-1 px-3 bg-gray-500 rounded-sm">
                            <AiOutlineSearch className="text-2xl text-white" />
                        </div>
                        <div ref={ref} className="sm:hidden p-1 px-3 bg-gray-500 rounded-sm cursor-pointer">
                            <AiOutlineFilter onClick={() => setShowFilter(!showFilter)} className="text-2xl text-white" />
                        </div>
                        
                        {showFilter && (
                            <div  className='absolute z-50 h-[100vh] top-0 left-0'>
                                <SidebarFilter />
                            </div>
                        )}
                    </div>
                    {/* product list */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {searchFilteredProduct.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                </div>
            </div>
            {/* search bar */}
            {/* product list */}
        </div>
    )
}

export default Homepage