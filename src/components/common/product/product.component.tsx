import styles from "./product.module.scss";

export default function ProductComponent() {
    return (
        <div className={styles.productItem}>
            <div className={styles.header}>
                <div className={styles.category}>пицца</div>
                <p className={styles.date}>14.09.23</p>
            </div>
            <div className={styles.product}>
                <img src="images/pizza.png" alt="pizza" />
                <p>двойная пепперони</p>
            </div>
        </div>
    )
}