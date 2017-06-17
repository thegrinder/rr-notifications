import { RRN_SHOW_NOTIFICATION, RRN_HIDE_NOTIFICATION,
  RRN_HIDE_ALL_NOTIFICATIONS } from './constants';

const initialState = [];

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case RRN_SHOW_NOTIFICATION :
      return state.concat({
        uid: Date.now(),
        status: action.status,
        isVisible: true,
        ...action.opts,
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
    case RRN_HIDE_ALL_NOTIFICATIONS :
    default :
      return state;
  }
}
