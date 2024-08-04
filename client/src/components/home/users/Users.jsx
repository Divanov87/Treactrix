import { useEffect, useState, useRef } from 'react';
import { getUsersActivity} from '../../../api/eventAPI';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../loader/Loader';
import './Users.css';

export default function Users() {

  const [usersStatus, setUsersStatus] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [sortDirection, setSortDirection] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLogged } = useAuth();
  const onlineStatusRefs = useRef({});

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const usersStatus = await getUsersActivity();
      setUsersStatus(usersStatus);
      setSortedUsers(usersStatus);
      setIsLoading(false);

      usersStatus.forEach(user => {
        onlineStatusRefs.current[user._id] = user.online;
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  const fetchOnlineStatuses = async () => {
    try {
      const usersStatus = await getUsersActivity();
      usersStatus.forEach(user => {
        const isOnline = user.online;
        const dotElement = onlineStatusRefs.current[user._id];
        if (dotElement) {
          dotElement.style.backgroundColor = isOnline ? 'limegreen' : 'gray';
          dotElement.style.animation = isOnline ? "_badge-pulsate 2s infinite" : '';
        }
      });
    } catch (error) {
      console.error('Error fetching online statuses:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchOnlineStatuses, 5000);
    return () => clearInterval(interval);
  }, []);

  const getPropertyValue = (obj, column) => obj[column];

  const sort = (column) => {
    const direction = sortColumn === column ? !sortDirection[column] : true;
    setSortColumn(column);
    setSortDirection({ [column]: direction });

    const sorted = [...sortedUsers].sort((a, b) => {
      const aValue = getPropertyValue(a, column);
      const bValue = getPropertyValue(b, column);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction ? comparison : -comparison;
      } else {
        return direction ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1);
      }
    });

    setSortedUsers(sorted);
  };

  return (
    <article>
      <section className="movie-detail">
        <p className="section-subtitle">Users</p>
        <h2 className="h2 section-title" style={{ textTransform: 'capitalize' }}>{user?.username}'s <strong>Panel</strong></h2>
        {isLoading 
        ? (<Loader />) 
        : (<div className="container">
            <table className="user-table">
              <thead>
                <tr>
                  {['Id', 'Username', 'Role', 'E-mail', 'City', 'RegistationIp', 'LastLoginIp', 'RegistrationDate', 'LastLoginDate', 'Online'].map(column => (
                    <th key={column} onClick={() => sort(column)}>
                      {column} <i className={`${sortColumn !== column ? '' : sortDirection[column] ? 'bx bx-caret-up' : 'bx bx-caret-down'}`}></i>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr key={user._id} className={index % 2 !== 0 ? 'odd' : ''}>
                    <td data-label="_id">{user._id}</td>
                    <td data-label="Username">{user.username}</td>
                    <td data-label="Role">{user.role}</td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="City">{user.city}</td>
                    <td data-label="Registration IP">{user.registrationIp || <span style={{textAlign: 'center'}}>-</span>}</td>
                    <td data-label="Last Login IP">{user.lastLoginIp || <span style={{textAlign: 'center'}}>-</span>}</td>
                    <td data-label="Registration Date">{new Date(user.registrationDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    <td data-label="Last Login Date">{new Date(user.lastLoginDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    <td data-label="Online">
                      <span className="online-dot" ref={el => (onlineStatusRefs.current[user._id] = el)}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </article>
  );
}



// import { useEffect, useState } from 'react';
// import { getAllUsers } from '../../../api/eventAPI';
// import { useAuth } from '../../../context/AuthContext';
// import Loader from '../../loader/Loader';
// import './Users.css';

// export default function Users() {
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [usersWithStatus, setUsersWithStatus] = useState([]);
//   const [sortedUsers, setSortedUsers] = useState([]);
//   const [sortDirection, setSortDirection] = useState({});
//   const [sortColumn, setSortColumn] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { user, isLogged } = useAuth();

//   const fetchUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getAllUsers();
//       setRegisteredUsers(response.registeredUsers);
//       setUsersWithStatus(response.usersWithStatus);
//       setSortedUsers(response.usersWithStatus);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//     const interval = setInterval(fetchUsers, 6000); 
//     return () => clearInterval(interval);
//   }, []);

//   const getPropertyValue = (obj, column) => obj[column];

//   const sort = (column) => {
//     const direction = sortColumn === column ? !sortDirection[column] : true;
//     setSortColumn(column);
//     setSortDirection({ [column]: direction });

//     const sorted = [...sortedUsers].sort((a, b) => {
//       const aValue = getPropertyValue(a, column);
//       const bValue = getPropertyValue(b, column);

//       if (typeof aValue === 'string' && typeof bValue === 'string') {
//         const comparison = aValue.localeCompare(bValue);
//         return direction ? comparison : -comparison;
//       } else {
//         return direction ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1);
//       }
//     });

//     setSortedUsers(sorted);
//   };

//   return (
//     <article>
//       <section className="movie-detail">
//         <p className="section-subtitle">Users</p>
//         <h2 className="h2 section-title" style={{ textTransform: 'capitalize' }}>{user?.username}'s <strong>Panel</strong></h2>
//         {isLoading 
//         ? (<Loader />) 
//         : (<div className="container">
//             <table className="user-table">
//               <thead>
//                 <tr>
//                   {['_id', 'username', 'email', 'city', 'registrationIp', 'lastLoginIp', 'registrationDate', 'lastLoginDate', 'online'].map(column => (
//                     <th key={column} onClick={() => sort(column)}>
//                       {column} <i className={`bx bxs-sort-alt ${sortColumn !== column ? '' : sortDirection[column] ? 'bx bx-caret-up' : 'bx bx-caret-down'}`}></i>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedUsers.map((user, index) => (
//                   <tr key={user._id} className={index % 2 !== 0 ? 'odd' : ''}>
//                     <td data-label="_id">{user._id}</td>
//                     <td data-label="Username">{user.username}</td>
//                     <td data-label="Email">{user.email}</td>
//                     <td data-label="City">{user.city}</td>
//                     <td data-label="Registration IP">{user.registrationIp || '-'}</td>
//                     <td data-label="Last Login IP">{user.lastLoginIp || '-'}</td>
//                     <td data-label="Registration Date">{new Date(user.registrationDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//                     <td data-label="Last Login Date">{new Date(user.lastLoginDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//                     <td data-label="Online">
//                       {user.online ? <span className="online-dot"></span> : <span className="offline-dot"></span>}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </article>
//   );
// }

// import { useEffect, useState } from 'react';
// import { getAllUsers } from '../../../api/eventAPI';
// import { useAuth } from '../../../context/AuthContext';
// import Loader from '../../loader/Loader';
// import './Users.css';

// export default function Users() {
//   const [registeredUsers, setRegisteredUsers] = useState([]);
//   const [usersWithStatus, setUsersWithStatus] = useState([]);
//   const [sortedUsers, setSortedUsers] = useState([]);
//   const [sortDirection, setSortDirection] = useState({});
//   const [sortColumn, setSortColumn] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { user, isLogged } = useAuth();

//   useEffect(() => {
//     getAllUsers().then((response) => {
//       setRegisteredUsers(response.registeredUsers);
//       setUsersWithStatus(response.usersWithStatus);
//       setSortedUsers(response.usersWithStatus);
//       setIsLoading(false);
//     }).catch((error) => {
//       console.error('Error fetching users:', error);
//       setIsLoading(false);
//     });
//   }, []);

//   const getPropertyValue = (obj, column) => {
//     return obj[column];
//   };

//   const sort = (column) => {
//     const direction = sortColumn === column ? !sortDirection[column] : true;
//     setSortColumn(column);
//     setSortDirection({ [column]: direction });

//     const sorted = [...sortedUsers].sort((a, b) => {
//       const aValue = getPropertyValue(a, column);
//       const bValue = getPropertyValue(b, column);

//       if (typeof aValue === 'string' && typeof bValue === 'string') {
//         const comparison = aValue.localeCompare(bValue);
//         return direction ? comparison : -comparison;
//       } else {
//         return direction ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1);
//       }
//     });

//     setSortedUsers(sorted);
//   };

//   return (
//     <article>
//       <section className="movie-detail">
//         <p className="section-subtitle">Users</p>
//         <h2 className="h2 section-title" style={{ textTransform: 'capitalize' }}>{user?.username}'s <strong>Panel</strong></h2>
//         {isLoading 
//         ? (<Loader />) 
//         : (<div className="container">
//             <table className="user-table">
//               <thead>
//                 <tr>
//                   {['_id', 'username', 'email', 'city', 'registrationIp', 'lastLoginIp', 'registrationDate', 'lastLoginDate', 'online'].map(column => (
//                     <th key={column} onClick={() => sort(column)}>
//                       {column} <i className={`bx bxs-sort-alt ${sortColumn !== column ? '' : sortDirection[column] ? 'bx bx-caret-up' : 'bx bx-caret-down'}`}></i>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedUsers.map((user, index) => (
//                   <tr key={user._id} className={index % 2 !== 0 ? 'odd' : ''}>
//                     <td data-label="_id">{user._id}</td>
//                     <td data-label="Username">{user.username}</td>
//                     <td data-label="Email">{user.email}</td>
//                     <td data-label="City">{user.city}</td>
//                     <td data-label="Registration IP">{user.registrationIp || '-'}</td>
//                     <td data-label="Last Login IP">{user.lastLoginIp || '-'}</td>
//                     <td data-label="Registration Date">{new Date(user.registrationDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//                     <td data-label="Last Login Date">{new Date(user.lastLoginDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//                     <td data-label="Online">
//                       {user.online ? <span className="online-dot"></span> : <span className="offline-dot"></span>}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </article>
//   );
// };

// import { useEffect, useState } from 'react';

// import { getAllUsers } from '../../../api/eventAPI';
// import { useAuth } from '../../../context/AuthContext';
// import Loader from '../../loader/Loader';

// import './Users.css';

// export default function Users() {
//   const [users, setUsers] = useState([]);
//   const [sortedUsers, setSortedUsers] = useState([]);
//   const [sortDirection, setSortDirection] = useState({});
//   const [sortColumn, setSortColumn] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { user, isLogged } = useAuth();


//   useEffect(() => {
//     getAllUsers().then((response) => {
//       setUsers(response);
//       setSortedUsers(response);
//       setIsLoading(false);
//     }).catch((error) => {
//       console.error('Error fetching users:', error);
//       setIsLoading(false);
//     });
//   }, []);

//   const getPropertyValue = (obj, column) => {
//     return obj[column];
//   };

//   const sort = (column) => {
//     const direction = sortColumn === column ? !sortDirection[column] : true;
//     setSortColumn(column);
//     setSortDirection({ [column]: direction });

//     const sorted = [...sortedUsers].sort((a, b) => {
//       const aValue = getPropertyValue(a, column);
//       const bValue = getPropertyValue(b, column);

//       if (typeof aValue === 'string' && typeof bValue === 'string') {
//         const comparison = aValue.localeCompare(bValue);
//         return direction ? comparison : -comparison;
//       } else {
//         return direction ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1);
//       }
//     });

//     setSortedUsers(sorted);
//   };

//   return (
//     <article>
//       <section className="movie-detail">
//         <p className="section-subtitle">Users</p>
//         <h2 className="h2 section-title" style={{ textTransform: 'capitalize' }}>{user?.username}'s <strong>Panel</strong></h2>
//         {isLoading 
//         ? (<Loader />) 
//         : (<div className="container">
//             <table className="user-table">
//               <thead>
//                 <tr>
//                   {['_id', 'username', 'email', 'city', 'registrationIp', 'lastLoginIp', 'registrationDate', 'lastLoginDate'].map(column => (
//                     <th key={column} onClick={() => sort(column)}>
//                       {column} <i className={`bx bxs-sort-alt ${sortColumn !== column ? '' : sortDirection[column] ? 'bx bx-caret-up' : 'bx bx-caret-down'}`}></i>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedUsers.map((user, index) => (
//                   <tr key={user._id} className={index % 2 !== 0 ? 'odd' : ''}>
//                     <td data-label="_id">{user._id}</td>
//                     <td data-label="Username" style={{textTransform: 'capitalize'}}>{user.username}</td>
//                     <td data-label="Email">{user.email}</td>
//                     <td data-label="City" style={{textTransform: 'capitalize'}}>{user.city}</td>
//                     <td data-label="Registration IP">{user.registrationIp || <span style={{textAlign: 'center'}}>-</span>}</td>
//                     <td data-label="Last Login IP" >{user.lastLoginIp || <span style={{textAlign: 'center'}}>-</span>}</td>
//                     <td data-label="Registration Date">{new Date(user.registrationDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//                     <td data-label="Last Login Date">{new Date(user.lastLoginDate).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </article>
//   );
// };