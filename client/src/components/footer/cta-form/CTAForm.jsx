import { useState } from 'react';

import Swal from 'sweetalert2';

import { addBulletin, removeBulletin } from '../../../api/bulletinAPI';

import styles from './CTAForm.module.css';

export default function CTAForm() {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validEmail = /^[a-zA-Z0-9._-]{3,}@(gmail\.com|abv\.bg|mail\.bg)$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address!',
      });
      return;
    }
    try {
      const response = await addBulletin({ email });
      if (response.success) {
        setMessage('Successfully subscribed!');
        Swal.fire({
          icon: 'success',
          title: 'Subscribed!',
          text: 'Successfully subscribed to the bulletin.',
          timer: 3000,
          showConfirmButton: false,
        });
        setEmail('');
      } else if (response.message === 'Email already subscribed') {
        Swal.fire({
          title: 'Email already subscribed',
          text: 'Do you want to unsubscribe instead?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, unsubscribe',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const unsubscribeResponse = await removeBulletin({ email });
            if (unsubscribeResponse.success) {
              setMessage('Successfully unsubscribed!');
              Swal.fire({
                icon: 'success',
                title: 'Unsubscribed!',
                text: 'Successfully unsubscribed from the bulletin.',
                timer: 3000,
                showConfirmButton: false,
              });
              setEmail('');
            } else {
              setMessage('Failed to unsubscribe. Try again later.');
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to unsubscribe. Try again later.',
              });
            }
          }
        });
      } else {
        setMessage('Failed to subscribe. Try again later.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to subscribe. Try again later.',
        });
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <section className={styles['cta']}>
      <div className={styles['container']}>
        <div className={styles['title-wrapper']}>
          <h2 className={styles['cta-title']}>
            Subscribe for our <strong>FREE</strong> bulletin
          </h2>
          <p className={styles['cta-text']}>
            Get weekly updates about the hottest performances and events, exclusive discounts, &amp; more!
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles['cta-form']}>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles['email-field']}
          />
          <button type="submit" className={styles['cta-form-btn']}>
            Get started
          </button>
        </form>
        {message && <p className={styles['message']}>{message}</p>}
      </div>
    </section>
  );
}




// export default function CTAForm() {
//   return (
//     <section className={styles['cta']}>
//       <div className={styles['container']}>
//         <div className={styles['title-wrapper']}>
//           <h2 className={styles['cta-title']}>
//             Subscribe for our <strong>FREE</strong> bulletin
//           </h2>
//           <p className={styles['cta-text']}>
//             Get weekly updates about hottest performances and events, exclusive
//             discounts, &amp; more!
//           </p>
//         </div>
//         <form action="" method="POST" className={styles['cta-form']}>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             required
//             placeholder="Enter your email"
//             className={styles['email-field']}
//           />
//           <button type="submit" className={styles['cta-form-btn']}>
//             Get started
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }


