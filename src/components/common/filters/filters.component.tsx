import styles from './filters.module.scss';
import { useContext, useState } from 'react';
import { DataContext } from '../../pages/home.page';

export default function FiltersComponent() {
    const data = useContext(DataContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  
    function getCounter(categoryId: number): number {
        let counter: number = 0;

        // Подсчет продуктов принадлежащих категории
        data.data.products.forEach((product) => 
            product.category == categoryId ? counter ++ : null
        )

        return counter;
    }

    function chooseFilter(categoryId: number) {
        if (selectedCategoryId !== categoryId) setSelectedCategoryId(categoryId)
        else setSelectedCategoryId(null)
    }
  
    return (
      <div className={styles.filtersWrapper}>
        <div className={styles.categoriesList}>
          {data.data.categories.map((category) => (
            <div
                className={`${styles.category} ${selectedCategoryId === category.id ? styles.active : ''}`}
                key={category.id}
                style={{ backgroundColor: category.color }}
                onClick={() => chooseFilter(category.id)}
            >
              <p className={styles.name}>{category.name}</p>
              <p className={styles.counter}>{getCounter(category.id)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }