import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Product } from "../../core/interfaces/products.interface";
import FiltersComponent from "../common/filters/filters.component";
import ProductComponent from "../common/product/product.component";
import styles from './pages.module.scss';

export const DataContext = createContext<{ data: {categories: any[]; products: any[] }}>({ data: {categories: [], products: [] }});

export default function HomePageComponent() {
    const [data, setData] = useState({
        categories: [],
        products: []
      });
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const responseCategories = await axios.get('http://localhost:3001/categories');
          const responseProducts = await axios.get('http://localhost:3001/products');
    
          setData({
            categories: responseCategories.data,
            products: responseProducts.data
          });
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <DataContext.Provider value={{data}}>
            <div className={styles.pageContainer}>
                <div className={styles.header}>мое приложение</div>
                <FiltersComponent></FiltersComponent>
                <div className={styles.productContainer}>
                    {data.products.map((product:Product) => (
                        <ProductComponent product={product} key={product.id}></ProductComponent>
                    ))}
                </div>
            </div>
        </DataContext.Provider>
    )
}