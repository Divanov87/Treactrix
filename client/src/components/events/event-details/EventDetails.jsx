import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

import QRCode from 'react-qr-code';
import Swal from 'sweetalert2';

import { formatDate } from '../../../libs/dateFormatter.js';
import { shareContent } from '../../../libs/userShare.js';

import {
  getEvent,
  cloneEvent,
  deleteEvent,
  buyTickets,
  likeEvent,
  pinEvent,
  unlikeEvent,
  unpinEvent,
} from '../../../api/eventAPI.js';

import { useAuth } from '../../../context/AuthContext.jsx';

import Loader from '../../loader/Loader.jsx';
import EventMeta from './event-meta/EventMeta.jsx'
import EventComments from './event-comments/EventComments.jsx';

import styles from './EventDetails.module.css';


export default function EventDetail() {

  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  const { user, isLogged } = useAuth();
  const userId = user?._id;
  const { eventId } = useParams();

  const eventData = { eventId, userId };

  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEvent(eventId);
        setEvent(event);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();

  }, [eventId]);


  // AbortController TEST

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   const fetchEvent = async () => {
  //     try {
  //       const event = await getEvent(eventId, signal);
  //       setEvent(event);
  //     } catch (error) {
  //       if (error.name !== 'AbortError') {
  //         console.error('Error fetching event:', error);
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchEvent();

  //   return () => {
  //     controller.abort();
  //     console.log('AbortController aborted loading!')
  //     console.log(controller.signal.aborted);
  //   };
  // }, [eventId]);

  const BuyTickets = async () => {
    if (user?.role === 'user') {
      try {
        await buyTickets(eventData);
        const updatedEvent = await getEvent(eventId);
        setEvent(updatedEvent);
      } catch (error) {
        console.error('Error buying tickets:', error);
      }
    }
  };

  const BuyDialog = () => {
    if (user?.role === 'user') {
      Swal.fire({
        title: 'Confirm buying tickets',
        // text: 'Are you sure you want to buy tickets for \n' + event.name + ' ?',
        html: `Are you sure you want to buy tickets for <br> <b style="color: white">"${event.name}"</b> ?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'YES, buy tickets',
      }).then((result) => {
        if (result.isConfirmed) {
          BuyTickets();
          Swal.fire('Tickets bought successfully!', '', 'success');
        }
      });
    } else {
      Swal.fire('No rights to buy tickets!', '', 'error');
    }
  };

  const LikeEvent = async () => {
    if (user?.role === 'user') {
    try {
      await likeEvent(eventData);
      const updatedEvent = await getEvent(eventId);
      setEvent(updatedEvent);
    } catch (error) {
      console.error('Error liking event:', error);
    }
  }
  };

  const UnlikeEvent = async () => {
    if (user?.role === 'user') {
    try {
      await unlikeEvent(eventData);
      const updatedEvent = await getEvent(eventId);
      setEvent(updatedEvent);
    } catch (error) {
      console.error('Error unliking event:', error);
    }
  }
  };

  const PinEvent = async () => {
    if (user?.role === 'admin') {
    try {
      await pinEvent(eventData);
      console.log('Event pinned successfully!');
      const pinnedEvent = await getEvent(eventId);
      setEvent(pinnedEvent);
    } catch (error) {
      console.error('Error pinning event:', error);
    }
  }
  };

  const PinDialog = () => {
    if (user?.role === 'admin') {
      Swal.fire({
        title: 'Confirm adding to home page',
        html: `Are you sure you want to add <br> <b style="color: white">"${event.name}"</b> to home page?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, pin event'
      }).then((result) => {
        if (result.isConfirmed) {
          PinEvent();
          navigate('/');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Event pinned successfully!'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'No rights to pin events!',
        icon: 'error'
      });
    }
  }

  const UnpinEvent = async () => {
    if (user?.role === 'admin') {
    try {
      await unpinEvent(eventData);
      const pinnedEvent = await getEvent(eventId);
      setEvent(pinnedEvent);
    } catch (error) {
      console.error('Error unpinning event:', error);
    }
  }
  };

  const UnpinDialog = async () => {
    if (user?.role === 'admin') {
      Swal.fire({
        title: 'Confirm removing event from home page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, unpin event'
      }).then((result) => {
        if (result.isConfirmed) {
          UnpinEvent();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Event unpinned successfully'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'No rights to pin events!',
        icon: 'error'
      });
    }
  }

  const CloneEvent = async () => {
    if (user?.role === 'admin') {
      try {
        const result = await Swal.fire({
          title: 'Confirm cloning event?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, clone event'
        });

        if (result.isConfirmed) {
          const response = await cloneEvent(eventId);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: `<span style="color: red;">${response}</span> cloned successfully!`,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          navigate('/events');
        }
      } catch (error) {
        console.error('Error cloning event:', error);
      }
    } else {
      console.log('Not Authorized!');
      Swal.fire({
        title: 'No rights to clone events!',
        icon: 'error'
      });
    }
  }

  const DeleteEvent = async () => {
    if (user?.role === 'admin') {
      try {
        await deleteEvent(eventId);
        navigate('/events');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const DeleteDialog = () => {
    if (user?.role === 'admin') {
      Swal.fire({
        title: 'Do you really want to \n DELETE \n"' + event?.name + '" ?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete event',
      }).then((result) => {
        if (result.isConfirmed) {
          DeleteEvent();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          Toast.fire({
            icon: 'success',
            title: 'Event deleted successfully'
          });
        }
      });
    } else {
      Swal.fire('Not Authorized!', '', 'error');
    }
  };

  const ReadMore = () => setShowAll(showAll !== !showAll);

  return (
    <article>
      <section className={styles['movie-detail']}>
        <p className={styles['section-subtitle']}>Events</p>
        <h2 className={`${styles['h2']} ${styles['section-title']}`}>
          {event?.category?.toUpperCase()} <strong>PERFORMANCE</strong>
        </h2>
        {isLoading
          ? <Loader />
          : <>
            <div className={styles['container']}>
              <figure className={styles['movie-detail-banner']}>
                <img src={event?.imageUrl} alt={event?.name} />
              </figure>
              <div className={styles['movie-detail-content']}>
                <p className={styles['detail-subtitle']}>
                  <b className='badge badge-fill'>{event?.genre}</b> <b className='badge badge-outline'>{event?.restriction}+</b>
                </p>
                <h1 className={`${styles['h1']} ${styles['detail-title']}`} style={{ textTransform: 'uppercase' }}>{event?.name}</h1>
                <div className={styles['meta-wrapper']}>
                  <div className={styles['date-time']}>
                    <div className={styles['location-badge']} style={{ textTransform: 'capitalize' }}>
                      <i className="bx bxs-map"></i>
                      <time>{event?.location}</time>
                    </div>
                    |
                    <div>
                      <i className="bx bx-calendar"></i>
                      <time dateTime={event?.date}>
                        {formatDate(event?.date)}
                      </time>
                    </div>
                    |
                    <div>
                      <i className="bx bx-time"></i>
                      <time>{event?.time}</time>
                    </div>
                    |
                    <div>
                      <i className="bx bx-timer"></i>
                      <time>{event?.duration} min</time>
                    </div>
                    {/* |
                    <div className='genre-wrapper'>
                      <div className='badge badge-fill'>{event?.genre}</div>
                    </div> */}
                    {/*
                    |
                   <div className='badge-wrapper'>
                      <div className='badge badge-outline'>{event?.restriction}+</div>
                    </div> */}
                  </div>
                </div>
                <p className={styles['storyline']}>
                  {showAll ? event?.description : `${event?.description?.slice(0, 250)}...`}
                  {!showAll && <button onClick={ReadMore}>Read More</button>}
                </p>
                {isLogged && (
                  <div className={styles['details-actions']}>

                    {user?.role === 'admin' && (
                      <>

                        <Link to={`/events/${event?._id}/edit`}>
                          <button className='share'>
                            <i className={`bx bx-edit-alt admin ${styles['box-details']}`}></i>
                            <span>Edit</span>
                          </button >
                        </Link>
                        {event?.pinsList?.length > 0 ? (
                          <button className='share' onClick={UnpinDialog}>
                            <i className={`bx bxs-bell-ring bx-tada admin-pin ${styles['box-details']}`}></i>
                            <span>Pinned!</span>
                          </button>
                        ) : (
                          <button className='share' onClick={PinDialog}>
                            <i className={`bx bx-bell bx-tada-hover admin ${styles['box-details']}`}></i>
                            <span>Pin</span>
                          </button>
                        )}
                        {!event?.name?.includes('_') ? (
                          <button className='share' onClick={CloneEvent}>
                            <i className={`bx bx-copy-alt admin ${styles['box-details']}`}></i>
                            <span>Clone</span>
                          </button>)
                          : (<button className='share' onClick={CloneEvent}>
                            <i className={`bx bxs-error bx-flashing admin  ${styles['box-details']}`}></i>
                            <span>Cloned!</span>
                          </button>)}
                        <button className='share'>
                          <i className={`bx bxs-coupon admin admin-coupon ${styles['box-details']}`}></i>
                          <span>{event?.ticketsLeft - 1}</span>
                        </button>
                        <button className='share' onClick={DeleteDialog}>
                          <i className={`bx bx-trash admin ${styles['box-details']}`}></i>
                          <span>Delete</span>
                        </button>
                        {/* <Link to={`/events/${event?._id}/edit`} className={`${styles['btn']} ${styles['btn-primary']}`}>Edit </Link>
                        <button className={`${styles['btn']} ${styles['btn-primary']}`}  onClick={DeleteDialog}>
                          Delete
                        </button> */}
                      </>
                    )}
                    {user?.role === 'user' && (
                      <>
                        <button className='share' onClick={shareContent}>
                          <i className={`bx bx-share-alt bx-tada-hover ${styles['box-details']}`}></i>
                          <span>Share</span>
                        </button>
                        {!event?.isLiked ? (
                          <button className='share' onClick={LikeEvent}>
                            <i className={`bx bx-heart bx-burst-hover ${styles['box-details']}`}></i>
                            <span>Like</span>
                          </button>
                        ) : (
                          <button className='share' onClick={UnlikeEvent}>
                            <i className={`bx bxs-heart user-heart ${styles['box-details']}`}></i>
                            <span>{event?.likesList?.length}</span>
                          </button>
                        )}
                        <button className='share'>
                          <i className={`bx bxs-coupon admin admin-coupon ${styles['box-details']}`} style={{ color: 'white' }}></i>
                          <span>{event?.ticketsLeft - 1}</span>
                        </button>
                        {event?.ticketsLeft - 1 > 0 ? (
                          <button className={`${styles['btn']} ${styles['btn-primary']}`} onClick={BuyDialog}>
                            Buy Tickets
                          </button>
                        ) : (
                          <button className={styles['sold-out']}>
                            Sold out
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className={styles['download-btn']}>
                <QRCode title="Send your favourite event quickly to your mobile!" value={window.location.href} bgColor='transparent' fgColor='#e60a15' size={125} />
                <span className={styles['qr']}>
                  <span>Scan me!</span>
                </span>
              </div>
            </div>
            </>
          }
        </section>
        {!isLoading && <EventMeta />}
        {!isLoading && <EventComments />}
      </article>
    );
  };