import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { getComment, addComment, deleteComment, updateComment } from '../../../../api/commentAPI.js';
import { useAuth } from '../../../../context/AuthContext.jsx';

import { formatDateAdmin } from '../../../../libs/dateFormatter.js';
import { maskEmail } from '../../../../libs/emailMasker.js';

import styles from './EventComments.module.css';


export default function EventComments() {

  const [isLoading, setIsLoading] = useState(true);

  const [showAll, setShowAll] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState('');

  const navigate = useNavigate();
  const { user, isLogged } = useAuth();
  const userId = user?._id;
  const { eventId } = useParams();

  const eventData = { eventId, userId };

  useEffect(() => {
    
    const getComments = async () => {
      try {
          const data = await getComment(eventId);
          setComments(data);
      } catch (error) {
          console.error('Error fetching comments:', error);
      }
  };

    getComments();
  
  }, [eventId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
        const commentData = { userId, text: newComment };
        const newCommentData = await addComment(eventId, commentData); 

        setComments(prevComments => [...prevComments, newCommentData]);
        setNewComment('');
    } catch (error) {
        console.error('Error adding comment:', error);
    }
};



  const handleCommentDelete = async (commentId) => {
    try {
        await deleteComment(eventId, commentId);
        setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};

const startEditing = (comment) => {
  setEditingComment(comment);
  setEditedText(comment.text);
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  if (!editedText.trim()) return;

  try {
      await updateComment(editingComment._id, { text: editedText });
      const updatedComments = await getComment(eventId);
      setComments(updatedComments);
      setEditingComment(null);
      setEditedText('');
  } catch (error) {
      console.error('Error updating comment:', error);
  }
};


  return (
    <section className={styles['movie-detail']}>
    <section className={styles['container']}>
    <article className={styles['event-detail']}>
      <p className={styles['section-subtitle']}>Comments</p>
      <h2 className={`${styles['h2']} ${styles['section-title']}`}>
        WHAT PEOPLE ARE <strong>SAYING?</strong>
      </h2>

      {isLogged ? (
        <form onSubmit={handleCommentSubmit} className={styles['comment-form']}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit" className={styles['comment-button']}>Send</button>
        </form>
      ) : (<>
        <h2 className={`${styles['h3']} ${styles['section-title']}`}>(Please login to add a comment)</h2>
        </>
      )}

{comments.length === 0 ? (

        <h2 className={`${styles['no-comments']}`}>No comments <strong>yet..</strong> <br/><strong><strike>Love it?</strike></strong> Hate it? Be the first to <strong>share your thoughts!</strong></h2>
      ) : (
      <ul className={styles['comment-list']}>
        {comments.map((comment) => (
          <li key={comment._id} className={styles['comment']}>
            <div>
              <button className={styles['comment-delete']}>
                {`${comment.author.username} (${maskEmail(comment.author.email)})`}
              </button>
              <p>{comment.text}</p>
              <i>{formatDateAdmin(comment.createdAt)}</i>
              {(userId === comment.author._id || user?.role === 'admin') && (
                <>
                  {editingComment && editingComment._id === comment._id ? (
                    <form onSubmit={handleEditSubmit}>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        required
                      />
                      <button type="submit" className={styles['comment-delete']} >Update</button>&nbsp;
                      <button type="button" onClick={() => setEditingComment(null)} className={styles['comment-delete']} >Cancel</button>
                    </form>
                  ) : (
                    <>
                      <button className={styles['comment-delete']} onClick={() => startEditing(comment)}>Edit</button>
                      &nbsp;
                      <button className={styles['comment-delete']} onClick={() => handleCommentDelete(comment._id)}>Delete</button>
                    </>
                  )}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>)}
    </article>
  </section>
  </section>
  );
}
