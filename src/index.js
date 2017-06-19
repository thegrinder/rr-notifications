import reducer from './redux/reducer';
import { showNotification, hideAllNotifications } from './redux/actions';
import rrNotificationsFactory from './factories/rrNotificationsFactory';

const actions = { showNotification, hideAllNotifications };

export {
  reducer,
  actions,
  rrNotificationsFactory,
};
