import { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from 'axios'

const StateContext = createContext();


export const ContextProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);
    const [products, setProducts] = useState([]);
    const productRef = useRef([])

    // fetch the initial product data
    const fetchProducts = async () => {
        const res = await axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
        productRef.current = res.data
        setProducts(productRef.current)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // filter product by color
    const filterByColor = (colors) => {
        if (!colors.length)  return setProducts(productRef.current)
        let productByColor = []

        if(!productByColor.length) {
           colors.map(color => {
                productByColor.push(...productRef.current.filter(product => product.color.toLowerCase().includes(color)))
            })
        } else {
            colors.map(color => {
                productByColor.push(products.filter(product => product.color.toLowerCase().includes(color)))
            })
        }

        setProducts(productByColor)
    }

    // filter product by  type
    const filterByType = (types) => {
        if (!types.length) return setProducts(productRef.current)
        let productByType = []

        if(!productByType.length) {
            types.map(type => {
                productByType.push(...productRef.current.filter(product => product.type.toLowerCase().includes(type)))
            })
         } else {
            types.map(type => {
                productByType.push(...products.filter(product => product.type.toLowerCase().includes(type)))
            })
         }
        

        setProducts(productByType)
    }

    // filter product by gender
    const filterByGender = (genders) => {
        if (!genders.length) return setProducts(productRef.current)
        let productByGender = []

        if(!productByGender.length) {
            
            genders.map(gender => {
                productByGender.push(...productRef.current.filter(product => product.gender.toLowerCase().includes(gender)))
            })
        } else {

            genders.map(gender => {
                productByGender.push(...products.filter(product => product.gender.toLowerCase().includes(gender)))
            })
        }

        setProducts(productByGender)
    }

    // filter product by price
    const filterByPrice = (prices) => {
        if (!prices.length) return setProducts(productRef.current)

        let productByPrice = []
        prices.map(price => {
            const priceRange = price.split('-')
            if (priceRange.length > 1) {
                productByPrice.push(...products.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]))
            } else if (priceRange.length === 1) {
                productByPrice.push(...products.filter(product => product.price >= priceRange[0]))
            }
        })
        setProducts(productByPrice)
    }


    return (
        <StateContext.Provider value={{ products, cartList, setCartList, filterByPrice, filterByColor, filterByType, filterByGender}}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)