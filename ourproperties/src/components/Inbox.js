import React, { useState, useEffect } from 'react';
import '../css/Inbox.css';
import { fetchUserMessages } from '../services/getMessages';
import { FiSearch, FiMail, FiUser, FiPhone, FiClock, FiAlertCircle } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Inbox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesData = await fetchUserMessages();
        // Sort messages by date (newest first)
        const sortedMessages = messagesData.sort((a, b) => 
          new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt)
        );
        setMessages(sortedMessages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  const filteredMessages = messages.filter(message =>
    (message.sendername?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.user?.phoneNumber?.includes(searchTerm))
  );

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  if (loading) {
    return (
      <div className="inbox-container">
        <div className="inbox-header">
          <h1><FiMail /> Inbox</h1>
          <div className="search-container">
            <FiSearch className="search-icon" />
            <Skeleton width={200} height={32} />
          </div>
        </div>
        <div className="messages-list">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="message-item skeleton-item">
              <Skeleton circle width={40} height={40} />
              <div className="message-details">
                <Skeleton width={150} />
                <Skeleton width={250} />
                <Skeleton width={100} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inbox-container error-state">
        <FiAlertCircle size={48} className="error-icon" />
        <h2>Error Loading Messages</h2>
        <p>{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedMessage) {
    return (
      <div className="message-detail-view">
        <button className="back-button" onClick={handleBackToList}>
          &larr; Back to inbox
        </button>
        <div className="message-header">
          <div className="sender-avatar">
            {selectedMessage.sendername?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="sender-info">
            <h2>{selectedMessage.sendername || 'Unknown Sender'}</h2>
            <div className="meta-info">
              {selectedMessage.user?.phoneNumber && (
                <span><FiPhone /> {selectedMessage.user.phoneNumber}</span>
              )}
              {selectedMessage.timestamp && (
                <span><FiClock /> {formatDistanceToNow(new Date(selectedMessage.timestamp))} ago</span>
              )}
            </div>
          </div>
        </div>
        <div className="message-content">
          <p>{selectedMessage.message || 'No message content'}</p>
        </div>
        <div className="message-actions">
          <button className="action-button reply-button">Reply</button>
          <button className="action-button delete-button">Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div className="inbox-container">
      <div className="inbox-header">
        <h1><FiMail /> Inbox</h1>
        <p>Manage your communications with potential clients</p>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search messages, senders, or phone numbers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="messages-list">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <div 
              key={msg.id} 
              className={`message-item ${msg.unread ? 'unread' : ''}`}
              onClick={() => handleMessageClick(msg)}
            >
              <div className="message-avatar">
                {msg.sendername?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="message-details">
                <div className="message-header">
                  <h2>{msg.sendername || 'Unknown Sender'}</h2>
                  {msg.timestamp && (
                    <span className="message-time">
                      {formatDistanceToNow(new Date(msg.timestamp))} ago
                    </span>
                  )}
                </div>
                <p className="message-preview">
                  {msg.message?.length > 100 
                    ? `${msg.message.substring(0, 100)}...` 
                    : msg.message || 'No message content'}
                </p>
                {msg.user?.phoneNumber && (
                  <div className="message-phone">
                    <FiPhone /> {msg.user.phoneNumber}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FiMail size={48} className="empty-icon" />
            <h3>No messages found</h3>
            <p>{searchTerm ? 'Try a different search term' : 'Your inbox is empty'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;