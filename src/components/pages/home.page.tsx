import FiltersComponent from "../common/filters/filters.component";
import ProductComponent from "../common/product/product.component";
import styles from './pages.module.scss';

export default function HomePageComponent() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>мое приложение</div>
            <FiltersComponent></FiltersComponent>
            <div className={styles.productContainer}>
                <ProductComponent></ProductComponent>
                <ProductComponent></ProductComponent>
                <ProductComponent></ProductComponent>
                <ProductComponent></ProductComponent>
                <ProductComponent></ProductComponent>
                <ProductComponent></ProductComponent>
                <ProductComponent></ProductComponent>
            </div>
        </div>
    )
}