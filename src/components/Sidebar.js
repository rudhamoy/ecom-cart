import { useState, useEffect } from 'react'
import { useStateContext } from "../context/ContextProvider"

const Sidebar = () => {
    const [selectedPrice, setSelectedPrice] = useState([])
    const [selectedColor, setSelectedColor] = useState([])
    const [selectedGender, setSelectedGender] = useState([])
    const [selectedType, setSelectedType] = useState([])

    const { filterByPrice, filterByColor, filterByType, filterByGender } = useStateContext();

    const filterColor = (color) => {
        if (selectedColor.includes(color)) {
            setSelectedColor(selectedColor.filter(i => i !== color))
        } else {
            setSelectedColor([...selectedColor, color])
        }
    }

    const filterType = (type) => {
        if (selectedType.includes(type)) {
            setSelectedType(selectedType.filter(i => i !== type))
        } else {
            setSelectedType([...selectedType, type])
        }
    }

    const filterGender = (gender) => {
        if (selectedGender.includes(gender)) {
            setSelectedGender(selectedGender.filter(i => i !== gender))
        } else {
            setSelectedGender([...selectedGender, gender])
        }
    }

    const priceFilter = (price) => {
        if (selectedPrice.includes(price)) {
            setSelectedPrice(selectedPrice.filter(i => i !== price))
        } else {
            setSelectedPrice([...selectedPrice, price])
        }
    }


    useEffect(() => {
        filterByPrice(selectedPrice)
    }, [selectedPrice])

    useEffect(() => {
        filterByColor(selectedColor)
    }, [selectedColor])

    useEffect(() => {
        filterByType(selectedType)
    }, [selectedType])

    useEffect(() => {
        filterByGender(selectedGender)
    }, [selectedGender])

    return (
        <div className='bg-white shadow-md border w-[80%] sm:w-[20%] p-4 fixed left-0 sm:left-10'>
            
            <ul className="my-3">
                <p className="font-semibold">Color</p>
                {['red', 'blue', 'green', 'pink', 'white', 'black', 'grey', 'purple', 'yellow'].map((color) => (
                    <li key={color}>
                        <input onChange={(e) => filterColor(e.target.name)} type="checkbox" name={color} />
                        <label htmlFor={color} className="capitalize ml-2 text-sm font-semibold">{color}</label>
                    </li>
                ))}
            </ul>

            <ul className="my-3">
                <p className="font-semibold">Gender</p>
                <li>
                    <input onChange={(e) => filterGender(e.target.name)} type="checkbox" name="men" />
                    <label htmlFor="men" className="capitalize ml-2 text-sm font-semibold">Men</label>
                </li>
                <li>
                    <input onChange={(e) => filterGender(e.target.name)} type="checkbox" name="women" />
                    <label htmlFor="women" className="capitalize ml-2 text-sm font-semibold">Women</label>
                </li>
            </ul>
            <ul className="my-3">
                <p className="font-semibold">Price</p>
                <li>
                    <input onChange={(e) => priceFilter(e.target.name)} type="checkbox" name="0-250" />
                    <label htmlFor="0-250" className="capitalize ml-2 text-sm font-semibold">0 - Rs. 250</label>
                </li>
                <li>
                    <input onChange={(e) => priceFilter(e.target.name)} type="checkbox" name="251-450" />
                    <label htmlFor="251-450" className="capitalize ml-2 text-sm font-semibold">Rs. 251- Rs. 450</label>
                </li>
                <li>
                    <input onChange={(e) => priceFilter(e.target.name)} type="checkbox" name="450" />
                    <label htmlFor="450" className="capitalize ml-2 text-sm font-semibold">Above Rs. 450</label>
                </li>
            </ul>
            <ul className="my-3">
                <p className="font-semibold">Type</p>
                <li>
                    <input onChange={e => filterType(e.target.name)} type="checkbox" name="polo" />
                    <label htmlFor="polo" className="capitalize ml-2 text-sm font-semibold">Polo</label>
                </li>
                <li>
                    <input onChange={e => filterType(e.target.name)} type="checkbox" name="hoodie" />
                    <label htmlFor="hoodie" className="capitalize ml-2 text-sm font-semibold">Hoodie</label>
                </li>
                <li>
                    <input onChange={e => filterType(e.target.name)} type="checkbox" name="basic" />
                    <label htmlFor="basic" className="capitalize ml-2 text-sm font-semibold">Basic</label>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar