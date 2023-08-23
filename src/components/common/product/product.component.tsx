import { useContext } from "react";

import styles from "./product.module.scss";
import { DataContext } from "../../pages/home.page";
import { Category, Product } from "../../../core/interfaces";

export default function ProductComponent({ product }: { product: Product }) {
    const data = useContext(DataContext);
    let category: Category | undefined = data.data.categories.find(
      (category) => category.id === product.category
    );

    //Приведение даты к формату DD.MM.YY
    function formateDate(date: Date) {
        //Получение массива с датой вида [day, month, year]
        const dateStr = (new Date(date)).toLocaleString().split(',')[0].split('.');
        //"Сборка" нужно формата строки вида DD.MM.YY
        const formateDate = `${dateStr[0]}.${dateStr[1]}.${dateStr[2].slice(-2)}`;

        return formateDate;
    }
  
    if (!category) return null;

    return (
        <div className={styles.productItem}>
            <div className={styles.header}>
                <div className={styles.category} style={{ backgroundColor: category.color }}>{category.name}</div>
                <p className={styles.date}>{formateDate(product.date)}</p>
            </div>
            <div className={styles.product}>
                <img src={`images/${category.icon}.png`} alt={category.name} />
                <p>{product.name}</p>
            </div>
        </div>
        );
  }