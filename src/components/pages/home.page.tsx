import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Category, Product } from "../../core/interfaces";
import FiltersComponent from "../common/filters/filters.component";
import ProductComponent from "../common/product/product.component";
import styles from './pages.module.scss';

export const DataContext = createContext<{
  data: { categories: Category[]; products: Product[] };
  shownData: Product[];
  setShownData: React.Dispatch<React.SetStateAction<Product[]>>;
}>({
  data: { categories: [], products: [] },
  shownData: [],
  setShownData: () => {},
});

export default function HomePageComponent() {
  const [data, setData] = useState<{ categories: Category[]; products: Product[] }>({
    categories: [],
    products: []
  });
  const [shownData, setShownData] = useState<Product[]>([]);
    
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
      setShownData(responseProducts.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <DataContext.Provider value={{data, shownData, setShownData}}>
        <div className="container">
          <div className={styles.pageContainer}>
                <div className={styles.header}>мое приложение</div>
                <FiltersComponent></FiltersComponent>
                <div className={styles.productContainer}>
                    {shownData.map((product:Product) => (
                        <ProductComponent product={product} key={product.id}></ProductComponent>
                    ))}
                </div>
            </div>
        </div>
      </DataContext.Provider>
  )
}