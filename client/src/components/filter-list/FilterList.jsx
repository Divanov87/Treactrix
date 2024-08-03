import { useState } from 'react';
import styles from './FilterList.module.css';

export default function FilterList({ handleCityFilter }) {
    const [selectedCity, setSelectedCity] = useState('All');
    const cities = ['Varna', 'Bourgas', 'Plovdiv', 'Sofia', 'London'];

    const handleButtonClick = (city) => {
        setSelectedCity(city);
        handleCityFilter(city === 'All' ? '' : city);
    };

    return (
        <ul className={styles['filter-list']}>
            {['All', ...cities].map((city) => (
                <li key={city}>
                    <button 
                        className={`${styles['filter-btn']} ${selectedCity === city ? styles['filter-btn-all'] : ''}`} 
                        onClick={() => handleButtonClick(city)}
                    >
                        {city}
                    </button>
                </li>
            ))}
        </ul>
    );
}


// import styles from './FilterList.module.css';

// export default function FilterList({ handleCityFilter }) {
//     const cities = ['Varna', 'Bourgas', 'Plovdiv', 'Sofia', 'London'];

//     return (
//         <ul className={styles['filter-list']}>
//             {['All', ...cities].map((city) => (
//                 <li key={city}>
//                     <button 
//                         className={`${styles['filter-btn']} ${city === 'All' ? styles['filter-btn-all'] : ''}`} 
//                         onClick={() => handleCityFilter(city === 'All' ? '' : city)}
//                     >
//                         {city}
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     );
// }


// import styles from './FilterList.module.css';

// export default function FilterList({ handleCityFilter }) {
//     const cities = ['Varna', 'Bourgas', 'Plovdiv', 'Sofia', 'London'];

//     return (
//         <ul className={styles['filter-list']}>
//             {['All', ...cities].map((city) => (
//                 <li key={city}>
//                     <button 
//                         className={styles['filter-btn']} 
//                         onClick={() => handleCityFilter(city === 'All' ? '' : city)}
//                     >
//                         {city}
//                     </button>
//                 </li>
//             ))}
//         </ul>
//     );
// }


// import styles from './FilterList.module.css';

// export default function FilterList() {
//     return (
//         <ul className={styles['filter-list']}>
//             <li><button className={styles['filter-btn']}>Varna</button></li>
//             <li><button className={styles['filter-btn']}>Bourgas</button></li>
//             <li><button className={styles['filter-btn']}>Plovdiv</button></li>
//             <li><button className={styles['filter-btn']}>Sofia</button></li>
//             <li><button className={styles['filter-btn']}>London</button></li>
//         </ul>
//     );
// }
