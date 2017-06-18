import reducer from './redux/reducer';
import { showNotification, hideAllNotifications } from './redux/actions';
import rrNotificationFactory from './factories/rrNotificationFactory';
import rrContainerFactory from './factories/rrContainerFactory';

const actions = { showNotification, hideAllNotifications };

export {
  reducer,
  actions,
  rrNotificationFactory,
  rrContainerFactory,
};
