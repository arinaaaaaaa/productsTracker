import styles from './filters.module.scss';
import { useContext, useState } from 'react';
import { DataContext } from '../../pages/home.page';
import { Product } from '../../../core/interfaces/products.interface';
import { Category } from '../../../core/interfaces/categories.interface';

export default function FiltersComponent() {
    const data = useContext(DataContext);
    const {setSortedData} = useContext(DataContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  
    function getCounter(categoryId: number): number {
        let counter: number = 0;

        // Подсчет продуктов принадлежащих категории
        data.data.products.forEach((product) => 
            product.category === categoryId ? counter ++ : null
        )

        return counter;
    }

    //Фильтрация данных по категории
    function chooseFilter(categoryId: number) {
        //Если нажатие не по ранее выбранной категории
        if (selectedCategoryId !== categoryId) {
            //Фильтрация всех данных по ID категории
            const sortedData: { categories: Category[]; products: Product[] } = {
                ...data.data,
                products: data.data.products.filter((product: Product) => product.category === categoryId)
            };
            //В данные для отображения сохраняются отфильтрованные данные
            setSortedData(sortedData);
            setSelectedCategoryId(categoryId)
        }
        //Если повторное нажатие на уже выбранную категорию (т.е. отмена фильтрации)
        else {
            //Фильтры обнуляются
            setSelectedCategoryId(null);
            //Отображаются все данные, которые были получены с сервера
            setSortedData(data.data);
        }
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