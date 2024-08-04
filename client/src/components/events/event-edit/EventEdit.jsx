import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, editEvent } from '../../../api/eventAPI';

import styles from '../../events/event-add/EventAdd.module.css';

export default function EventEdit() {
  const [eventForm, setEventForm] = useState({
    name: '',
    imageUrl: '',
    tickets: '',
    genre: '',
    restriction: '',
    duration: '',
    rating: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [today, setToday] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    setToday(currentDate.toISOString().split('T')[0]);

    async function fetchEvent() {
      try {
        const eventData = await getEvent(id); // Replace with actual API call
        // Ensure the date is in the correct format
        if (eventData.date) {
          eventData.date = new Date(eventData.date).toISOString().split('T')[0];
        }
        setEventForm(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    }

    fetchEvent();
  }, [id]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.length < 2) error = `Title must be at least 2 characters long. ${2 - value.length} more characters needed.`;
        if (value.length > 20) error = `Title must be at most 20 characters long. ${value.length - 20} characters too long.`;
        break;
      case 'imageUrl':
        if (!/^https?:\/\//.test(value)) error = 'Cover image URL must be a valid URL';
        break;
      case 'tickets':
        if (value < 1 || value > 500) error = 'Tickets must be between 1 and 500';
        break;
      case 'genre':
        if (value.length < 4) error = `Genre must be at least 4 characters long. ${4 - value.length} more characters needed.`;
        if (value.length > 12) error = `Genre must be at most 12 characters long. ${value.length - 12} characters too long.`;
        break;
      case 'restriction':
        if (!/^(0|12|16|18)$/.test(value)) error = 'Restriction must be 0, 12, 16, or 18';
        break;
      case 'duration':
        if (value < 60 || value > 180) error = 'Duration must be between 60 and 180 minutes';
        break;
      case 'rating':
        if (value < 0 || value > 10) error = 'Rating must be between 0 and 10';
        break;
      case 'date':
        if (!value) error = 'Date is required';
        break;
      case 'time':
        if (!value) error = 'Time is required';
        break;
      case 'location':
        if (value.length < 3) error = `Location must be at least 3 characters long. ${3 - value.length} more characters needed.`;
        break;
      case 'description':
        if (value.length < 10) error = `Description must be at least 10 characters long. ${10 - value.length} more characters needed.`;
        break;
      default:
        break;
    }
    return error;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setEventForm({ ...eventForm, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formErrors = {};
    Object.keys(eventForm).forEach((key) => {
      const error = validateField(key, eventForm[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    if (Object.keys(formErrors).length === 0) {
      try {
        const result = await editEvent(eventForm, id);
        console.log('Event edited successfully:', result);
        navigate('/events');
      } catch (error) {
        console.error('Error editing event:', error);
      }
    } else {
      setErrors(formErrors);
      console.log('Please fill in all required fields with valid inputs.');
    }
  };

  return (
    <article className={styles.article}>
      <section className={styles['movie-detail']}>
        <p className={styles['section-subtitle']}>Edit Event</p>
        <h2 className={styles['section-title']}>Event details</h2>
        <div className={styles['container-reg-log-edit']}>
          <div className={styles['wrapper']}>
            <form onSubmit={submitHandler}>
              <h1>Edit <strong>Record</strong></h1>

              <div className={styles['input-box']}>
                <input
                  type="text"
                  name="name"
                  placeholder="Title"
                  minLength="2"
                  required
                  value={eventForm.name}
                  onChange={changeHandler}
                />
              </div>
                {errors.name && <p className={styles['error']}>{errors.name}</p>}

              <div className={styles['input-box']}>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Cover (https://...)"
                  required
                  value={eventForm.imageUrl}
                  onChange={changeHandler}
                />
              </div>
                {errors.imageUrl && <p className={styles['error']}>{errors.imageUrl}</p>}

              <div className={styles['input-box']}>
                <input
                  type="number"
                  name="tickets"
                  placeholder="Tickets"
                  step="1"
                  min="1"
                  max="500"
                  required
                  value={eventForm.tickets}
                  onChange={changeHandler}
                />
              </div>
                {errors.tickets && <p className={styles['error']}>{errors.tickets}</p>}

              <div className={styles['input-box']}>
                <input
                  type="text"
                  name="genre"
                  placeholder="Genre"
                  minLength="4"
                  maxLength="12"
                  required
                  value={eventForm.genre}
                  onChange={changeHandler}
                />
              </div>
                {errors.genre && <p className={styles['error']}>{errors.genre}</p>}

              <div className={styles['input-box']}>
                <input
                  type="number"
                  name="restriction"
                  placeholder="Restriction (0, 12, 16, 18)"
                  step="2"
                  min="0"
                  max="18"
                  required
                  value={eventForm.restriction}
                  onChange={changeHandler}
                />
              </div>
                {errors.restriction && <p className={styles['error']}>{errors.restriction}</p>}

              <div className={styles['input-box']}>
                <input
                  type="number"
                  name="duration"
                  placeholder="Duration"
                  step="1"
                  min="60"
                  max="180"
                  required
                  value={eventForm.duration}
                  onChange={changeHandler}
                />
              </div>
                {errors.duration && <p className={styles['error']}>{errors.duration}</p>}

              <div className={styles['input-box']}>
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating"
                  min="0"
                  max="10"
                  step="0.1"
                  required
                  value={eventForm.rating}
                  onChange={changeHandler}
                />
              </div>
                {errors.rating && <p className={styles['error']}>{errors.rating}</p>}

              <div className={styles['input-box']}>
                <input
                  type="date"
                  name="date"
                  placeholder="Date"
                  min={eventForm.date}
                  required
                  value={eventForm.date}
                  onChange={changeHandler}
                />
              </div>
                {errors.date && <p className={styles['error']}>{errors.date}</p>}

              <div className={styles['input-box']}>
                <input
                  type="time"
                  name="time"
                  placeholder="Time"
                  required
                  value={eventForm.time}
                  onChange={changeHandler}
                />
              </div>
                {errors.time && <p className={styles['error']}>{errors.time}</p>}

              <div className={styles['input-box']}>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  minLength="3"
                  required
                  value={eventForm.location}
                  onChange={changeHandler}
                />
              </div>
                {errors.location && <p className={styles['error']}>{errors.location}</p>}

              <div className={styles['input-box']}>
                <select
                  name="category"
                  required
                  value={eventForm.category}
                  onChange={changeHandler}
                >
                  <option value="" disabled hidden>Category</option>
                  <option value="Concert">Concert</option>
                  <option value="Theater">Theater</option>
                </select>
              </div>
                {errors.category && <p className={styles['error']}>{errors.category}</p>}

              <div className={styles['input-box']} style={{ paddingBottom: '190px' }}>
                <textarea
                  name="description"
                  placeholder="Description..."
                  cols="30"
                  rows="10"
                  required
                  value={eventForm.description}
                  onChange={changeHandler}
                />
              </div>
                {errors.description && <p className={styles['error']}>{errors.description}</p>}
          
              <div className={styles['error-message']} style={{ paddingTop: '35px', display: Object.values(errors).some(error => error) ? 'block' : 'none' }}>
                Please fill in all required fields with valid inputs.
              </div>

              <div className={styles['input-box']} style={{ paddingBottom: '35px' }}>
                <button type="submit" disabled={Object.values(errors).some(error => error)} className={styles.btn}>
                  EDIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </article>
  );
}
