import { useEffect, useState } from 'react';
import { getMessages, deleteMessage } from '../../../../api/messageAPI';

import { formatDateAdmin } from '../../../../libs/dateFormatter';

import './Messages.css';

export default function Messages() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        const sortedMessages = response.sort((a, b) => new Date(b.messageDate) - new Date(a.messageDate));
        setMessages(sortedMessages);
      } catch (err) {
        alert('Error fetching messages');
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId);
      setMessages(messages.filter((msg) => msg._id !== messageId));
    } catch (err) {
      alert('Error deleting message');
    }
  };

  return (
    <article>
      <section className="movie-detail">
        <p className="section-subtitle">Questions</p>
        <h2 className="h2 section-title">User <strong>Messages</strong></h2>
        <div className="container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
               <tbody>
                {messages.map((msg, index) => (
                  <tr key={msg._id} className={index % 2 !== 0 ? 'odd' : ''}>
                  <td data-label="Username">{msg?.user?.username || 'Guest'}</td>
                  <td data-label="Email">{msg.email}</td>
                  <td data-label="Phone">{msg.phone}</td>
                  <td data-label="Date">{formatDateAdmin(msg.messageDate)}</td>
                  <td data-label="Message">{msg.message}</td>
                  <td data-label="Delete" style={{textAlign: 'center'}}>
                    <i 
                      className="bx bx-trash trash-icon"
                      onClick={() => handleDelete(msg._id)}
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
