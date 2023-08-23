import { useState } from 'react';
import styles from "./dropdown.module.scss";

export default function DropdownComponent() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dropdownMenu}>
            <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
                <p>сначала новые</p>
                <img src="images/chevron.png" alt="" />
            </div>
            {isOpen ? (
                <div className={styles.dropdownContent}>
                    <div className={styles.item}>сначала новые</div>
                    <div className={styles.item}>сначала старые</div>
                </div>
            ) : null}
        </div>
    );
}