import styles from './filters.module.scss';

export default function FiltersComponent() {
    return (
        <div className={styles.filtersWrapper}>
            <div className={styles.categoriesList}>
                <div className={styles.category}>
                    <p className={styles.name}>суши</p>
                    <p className={styles.counter}>1</p>
                </div>
                <div className={styles.category}>
                    <p className={styles.name}>пицца</p>
                    <p className={styles.counter}>1</p>
                </div>
                <div className={styles.category}>
                    <p className={styles.name}>бургеры</p>
                    <p className={styles.counter}>2</p>
                </div>
            </div>
        </div>
    )
}