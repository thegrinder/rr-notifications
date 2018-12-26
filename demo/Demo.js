import React, { useContext } from 'react';
import { NotificationsProvider, NotificationsContext } from '../src/index';


// Your custom notification component
const renderNotification = ({ payload, removeNotification }) => {
  const { type, text } = payload;
  return (
    <div>
      <div style={{ color: type === 'warning' ? 'red' : 'black' }}>{text}</div>
      <button type="button" onClick={removeNotification}>Click to close</button>
    </div>
  );
};

const Demo = () => {
  const { showNotification } = useContext(NotificationsContext);
  return (
    <div>
      <button
        type="button"
        onClick={() => showNotification({
          type: 'warning',
          text: 'This is a warning',
        })}
      >
        {'Add notification'}
      </button>
    </div>
  );
};

const Wrapper = () => (
  <NotificationsProvider renderNotification={renderNotification}>
    <Demo />
  </NotificationsProvider>
);

export default Wrapper;
