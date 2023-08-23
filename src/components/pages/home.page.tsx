import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Category, Product } from "../../core/interfaces";
import FiltersComponent from "../common/filters/filters.component";
import ProductComponent from "../common/product/product.component";
import styles from './pages.module.scss';

export const DataContext = createContext<{
  data: { categories: Category[]; products: Product[] };
  sortedData: { categories: Category[]; products: Product[] };
  setShownData: React.Dispatch<React.SetStateAction<{ categories: Category[]; products: Product[] }>>;
}>({
  data: { categories: [], products: [] },
  sortedData: { categories: [], products: [] },
  setShownData: () => {},
});

export default function HomePageComponent() {
  const [data, setData] = useState<{ categories: Category[]; products: Product[] }>({
    categories: [],
    products: []
  });
  const [sortedData, setShownData] = useState<{ categories: Category[]; products: Product[] }>({
    categories: [],
    products: []
  });
    
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const responseCategories = await axios.get('http://localhost:3001/categories');
      const responseProducts = await axios.get('http://localhost:3001/products');

      setData({
        categories: responseCategories.data,
        products: responseProducts.data
      });
      setShownData({
        categories: responseCategories.data,
        products: responseProducts.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <DataContext.Provider value={{data, sortedData, setShownData}}>
          <div className={styles.pageContainer}>
              <div className={styles.header}>мое приложение</div>
              <FiltersComponent></FiltersComponent>
              <div className={styles.productContainer}>
                  {sortedData.products.map((product:Product) => (
                      <ProductComponent product={product} key={product.id}></ProductComponent>
                  ))}
              </div>
          </div>
      </DataContext.Provider>
  )
}