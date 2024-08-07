import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { addMessage } from '../../../api/messageAPI';


import styles from '../../auth/register/Register.module.css';

export default function Contacts() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const validEmail = /^[a-zA-Z0-9._-]{3,}@(gmail\.com|abv\.bg|mail\.bg)$/;
  const validPhone = /^\+359[0-9]{9}$/;
  const validName = /^[a-zA-Z\s]+$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    switch (e.target.name) {
      case 'name':
        setErrors({
          ...errors,
          name: validName.test(e.target.value) ? '' : 'Invalid name. Only letters and spaces are allowed.'
        });
        break;
      case 'email':
        setErrors({
          ...errors,
          email: validEmail.test(e.target.value) ? '' : 'Invalid email. Please use a valid email address.'
        });
        break;
      case 'phone':
        setErrors({
          ...errors,
          phone: e.target.value === '' || validPhone.test(e.target.value) ? '' : 'Invalid phone number. It should start with +359 and contain 9 digits after.'
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!errors.name && !errors.email && !errors.phone) {
      Swal.fire({
        title: 'Do you really want to send this message?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, send message',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await addMessage(formData);
            navigate('/');
            Swal.fire({
              icon: 'success',
              title: 'Message sent successfully',
              showConfirmButton: false,
              timer: 3000,
              toast: true,
              position: 'top-end',
              timerProgressBar: true,
            });
            setFormData({ name: '', email: '', phone: '', message: '' });
            setErrors({ name: '', email: '', phone: '' });
          } catch (err) {
            Swal.fire('Error sending message', '', 'error');
          }
        }
      });
    } else {
      Swal.fire('Please fix the errors in the form before submitting.', '', 'error');
    }
  };

  return (
    <article>
      <section className={styles['movie-detail']}>
        <p className='section-subtitle'>Contact</p>
        <h2 className='h2 section-title'>
          Reach us <strong>out!</strong>
        </h2>
        <div className={styles['container-reg-log-edit']}>
          <div className={styles['wrapper']}>
            <form onSubmit={handleSubmit}>
              <h1>Contact</h1>
              <div className={styles['input-box']}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name.."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <i className='bx bxs-user'></i>
              </div>
              {errors.name && <p className={styles['error']}>{errors.name}</p>}
              <div className={styles['input-box']}>
                <input
                  type="text"
                  name="email"
                  placeholder="Your email.."
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <i className='bx bx-mail-send'></i>
              </div>
              {errors.email && <p className={styles['error']}>{errors.email}</p>}
              <div className={styles['input-box']}>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your phone.."
                    value={formData.phone}
                    onChange={handleChange}
                  />
                <i className='bx bxs-phone-call'></i>
              </div>
              {errors.phone && <p className={styles['error']}>{errors.phone}</p>}
              <div className={styles['input-box']} style={{ paddingBottom: '190px' }}>
                <textarea
                  name="message"
                  placeholder="Your message..."
                  cols="30"
                  rows="10"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className={styles['btn']}>Send</button>
            </form>
          </div>
        </div>
      </section>
    </article>
  );
};


// import { useState } from 'react';
// import { addMessage } from '../../../api/messageAPI';
// import styles from '../../auth/register/Register.module.css';

// export default function Contacts() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addMessage(formData);
//       alert('Message sent successfully');
//       setFormData({ name: '', email: '', phone: '', message: '' });
//     } catch (err) {
//       alert('Error sending message');
//     }
//   };

//   return (
//     <article>
//       <section className={styles['movie-detail']}>
//         <p className='section-subtitle'>Contact</p>
//         <h2 className='h2 section-title'>
//           Reach us <strong>out!</strong>
//         </h2>
//         <div className={styles['container-reg-log-edit']}>
//           <div className={styles['wrapper']}>
//             <form onSubmit={handleSubmit}>
//               <h1>Contact</h1>
//               <div className={styles['input-box']}>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your name.."
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <i className='bx bxs-user'></i>
//               </div>
//               <div className={styles['input-box']}>
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Your email.."
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 <i className='bx bx-mail-send'></i>
//               </div>
//               <div className={styles['input-box']}>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Your phone (optional).."
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//                 <i class='bx bxs-phone-call'></i><i class='bx bxs-phone-call'></i>
//               </div>
//               <div className={styles['input-box']} style={{ paddingBottom: '190px' }}>
//                 <textarea
//                   name="message"
//                   placeholder="Your message..."
//                   cols="30"
//                   rows="10"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button className={styles['btn']}>Send</button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </article>
//   );
// };
