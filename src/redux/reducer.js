import { RN_SHOW_NOTIFICATION, RN_HIDE_NOTIFICATION,
  RN_HIDE_ALL_NOTIFICATIONS } from './constants';

const initialState = [];

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case RN_SHOW_NOTIFICATION :
      return state.concat({
        uid: Date.now(),
        isVisible: true,
        options: action.options,
      });
    case RN_HIDE_NOTIFICATION :
      return state.map((notification) => {
        if (notification.uid === action.uid) {
          return {
            ...notification,
            isVisible: false,
          };
        }
        return notification;
      });
    case RN_HIDE_ALL_NOTIFICATIONS :
    default :
      return state;
  }
}
