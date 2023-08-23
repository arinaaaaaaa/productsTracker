import { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../../components/pages/home.page';
import { Sort } from '../../interfaces/sort.interface';
import styles from "./dropdown.module.scss";

export default function DropdownComponent({ sortList, selectedCategory }: { sortList: Sort[], selectedCategory: number | null }) {
    const {setShownData} = useContext(DataContext);
    const data = useContext(DataContext);
    
    const [isOpen, setIsOpen] = useState(true);
    const [sort, setSort] = useState<Sort | null>(null);

    useEffect(() => setSort(null), [selectedCategory])

    //Сортировка отображаемых продуктов по дате
    function sortData(sortItem: Sort) {
        //Если выбран не ранее используемая сортировка
        if (!sort || sortItem.id !== sort.id) {
            setSort(sortItem);
      
            setShownData((prevShownData) => {
            const sortedByDate = prevShownData.slice().sort((productA, productB) => {
                if (productA.date < productB.date) return (-1 * sortItem.order);
                if (productA.date > productB.date) return (1 * sortItem.order);
                return 0;
            });

            return sortedByDate;
            });
        }
        //Если выбрана та же сортировка, отменить сортировку
        else {
            setSort(null);
            setShownData(data.data.products);
        }
      }

    return (
        <div className={styles.dropdownMenu}>
            <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
                <p>{sort ? sort.title : 'отсортировать'}</p>
                <img src="images/chevron.png" alt="" />
            </div>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    {sortList.map((sortItem: Sort) => (
                        <div className={styles.item} key={sortItem.id} onClick={() => sortData(sortItem)}>
                            {sortItem.title}
                            {sort && sort.id === sortItem.id ? (
                                <img src="images/checkmark.png" alt=""></img>
                            ) : null }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}