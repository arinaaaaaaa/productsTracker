import { useContext } from "react";
import { Category, Product } from "../../../core/interfaces";
import { DataContext } from "../../pages/home.page";
import styles from "./product.module.scss";

export default function ProductComponent({ product }: { product: Product }) {
    const data = useContext(DataContext);
    let category: Category | undefined = data.data.categories.find(
      (category) => category.id === product.category
    );
  
    if (!category) return null;

    return (
        <div className={styles.productItem}>
            <div className={styles.header}>
                <div className={styles.category} style={{ backgroundColor: category.color }}>{category.name}</div>
                <p className={styles.date}>{product.date}</p>
            </div>
            <div className={styles.product}>
                <img src={`images/${category.icon}.png`} alt={category.name} />
                <p>{product.name}</p>
            </div>
        </div>
        );
  }