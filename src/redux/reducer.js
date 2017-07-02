import { RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION, RRN_REMOVE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS } from './constants';

export const initialState = [];

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case RRN_SHOW_NOTIFICATION :
      return state.concat({
        uid: action.options.uid || Date.now(),
        isVisible: true,
        options: action.options,
      });
    case RRN_HIDE_NOTIFICATION :
      return state.map((notification) => {
        if (notification.uid === action.uid) {
          return {
            ...notification,
            isVisible: false,
          };
        }
        return notification;
      });
    case RRN_REMOVE_NOTIFICATION :
      return state.filter(notification => notification.uid !== action.uid);
    case RRN_HIDE_ALL_NOTIFICATIONS :
      return state.map(notification => ({
        ...notification,
        isVisible: false,
      }));
    default :
      return state;
  }
}
