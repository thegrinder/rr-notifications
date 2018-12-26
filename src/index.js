import reducer from './redux/reducer';
import { showNotification, hideAllNotifications } from './redux/actions';
import rrNotificationsFactory from './factories/rrNotificationsFactory';
import NotificationsProvider, { NotificationsContext } from './components/NotificationsProvider';

const actions = { showNotification, hideAllNotifications };

export {
  reducer,
  actions,
  rrNotificationsFactory,
  NotificationsProvider,
  NotificationsContext,
};
