import { useEffect, useState } from 'react';

import { getBulletins, removeBulletin } from '../../../../api/bulletinAPI';
import { formatDateAdmin } from '../../../../libs/dateFormatter';


export default function Bulletin() {

  const [bulletins, setBulletins] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBulletins = async () => {
      try {
        const response = await getBulletins();
        setBulletins(response);
      } catch (error) {
        setMessage('Error fetching bulletins.');
      }
    };

    fetchBulletins();
  }, []);

  const handleUnsubscribe = async (email) => {
    try {
      const response = await removeBulletin({ email });
      if (response.success) {
        setBulletins(bulletins.filter(bulletin => bulletin.email !== email));
        setMessage('Successfully unsubscribed!');
      } else {
        setMessage('Failed to unsubscribe.');
      }
    } catch (error) {
      setMessage('Error occurred while unsubscribing.');
    }
  };

  return (

    <article>
      <section className="movie-detail">
        <p className="section-subtitle">subscribers</p>
        <h2 className="h2 section-title">Bulletin <strong>Subscriptions</strong></h2>
        {message && <p className='error'>{message}</p>}
        <div className="container">
          <table className="user-table">
            <thead>
            <tr>
              <th>Email</th>
              <th>Subscribe Date</th>
              <th>Unsubscribe</th>
            </tr>
          </thead>
          <tbody>
            {bulletins.map((bulletin, index) => (
              <tr key={bulletin._id} className={index % 2 !== 0 ? 'odd' : ''}>
                <td>{bulletin.email}</td>
                <td>{formatDateAdmin(bulletin.subscribedAt)}</td>
                <td style={{textAlign: 'center'}}>
                  <i 
                      className="bx bx-trash trash-icon"
                      onClick={() => handleUnsubscribe(bulletin.email)}
                    ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </article>
  );
}