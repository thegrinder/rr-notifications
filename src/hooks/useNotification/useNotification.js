import { useContext } from 'react';
import { NotificationsContext } from '../../components/NotificationsProvider/NotificationsProvider';

const useNotification = () => useContext(NotificationsContext);

export default useNotification;
