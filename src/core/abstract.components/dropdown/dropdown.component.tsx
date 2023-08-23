import { useContext, useState } from 'react';
import { DataContext } from '../../../components/pages/home.page';
import { Sort } from '../../interfaces/sort.interface';
import styles from "./dropdown.module.scss";

export default function DropdownComponent({ sortList }: { sortList: Sort[] }) {
    const {shownData, setShownData} = useContext(DataContext);
    
    const [isOpen, setIsOpen] = useState(true);
    const [sort, setSort] = useState<Sort | null>(null);

    //Сортировка отображаемых продуктов по дате
    function sortData(sortItem: Sort) {
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

    return (
        <div className={styles.dropdownMenu}>
            <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
                <p>{sort ? sort.title : sortList[0].title}</p>
                <img src="images/chevron.png" alt="" />
            </div>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    {sortList.map((sortItem: Sort) => (
                        <div className={styles.item} key={sortItem.id} onClick={() => sortData(sortItem)}>
                            {sortItem.title}
                            {sort && sort.id == sortItem.id ? (
                                <img src="images/checkmark.png"></img>
                            ) : null }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}