# rr-notifications

## reducer

Import the reducer and pass it to the store.

``` javascript
import {createStore, combineReducers} from 'redux';
import {reducer as notifications} from 'rr-notifications';

const store = createStore(combineReducers({
  notifications,
}));

export store;
```

## rrNotificationFactory

rrNotificationFactory is a higher order function that accepts your custom Notification component and a number of options.

### Options

Property    | Type   | Default   | Required | Description
:-----------|:------:|:---------:|:--------:|:----------------------------------------
slideFromSide | 'right', 'left' | 'right' | no | Horizontal direction which notification appears from
animationDuration | string | '.4s' | no | Duration of the show and hide animation
animationEasing | string | 'ease' | no | Animation timing function / cubic-bezier

### Props

Thanks to rrNotificationFactory, your wrapped component has access to the following props:

Props | Types | Description
:-----|:-----:|:-----------
options | object | Custom data passed to the notification (see action creators section)
notificationHeight | number | Dynamically obtained height of the notification
isVisible | boolean | Whether the notification is visible. The initial value for a new notification is `true`. That's why if you want a custom animation, use css keyframes that let you define initial animation state
animationDuration | string | Animation duration passed down from the rrContainerFactory options
hideNotification | function | Function enabling you to close the current notification

### Example

``` javascript
import { rrNotificationFactory } from 'rr-notifications';

const YourCustomNotification = (props) => (
  // props available thanks to wrapping the component
  const { options, notificationHeight, isVisible,
    animationDuration, hideNotification } = props;
  <div>
    <div></div>
    <button onClick={hideNotification}>Click to close</button>
  </div>
);

export default rrNotificationFactory(YourCustomNotification);
```


## rrContainerFactory


rrContainerFactory is a higher order function that accepts a wrapped Notification component (see above) and a couple of options. It creates a container for the notifications according to the options you pass.

### Options

Property    | Type   | Default   | Required | Description
:-----------|:------:|:---------:|:--------:|:----------------------------------------
position | array | ['40px', '40px', 'auto', 'auto'] | no | Fixed position where notifications are displayed
stackNextOn | 'bottom', 'top' | 'top' | no | Position of the new notification in the stack

### Example

``` javascript
// App.js - root component

import { rrContainerFactory } from 'rr-notifications';
// import your wrapped custom notification component - see notificationFactory section
import WrappedNotification from './components/YourCustomNotification';

const Notifications = rrContainerFactory(WrappedNotification, {
  position: ['auto', 'auto', '40px', '40px'],
    stackNextOn: 'bottom',
    slideFromSide: 'left',
    animationDuration: '.8s',
    animationEasing: 'cubic-bezier(.63,.05,.43,1.7)',
});

class App extends Component {
  render() {
      return (
          <div>
              <Navbar />
                <MainContent />

                <Notifications />
            </div>
        )
    }
}

```

## redux action creators

There are two different actions creators available to you. `showNotification` takes an options object that is available to you inside your notification under `props.options`. You can pass all the necessary content and type (warning, danger, etc.) in that object. `hideAllNotifications` takes no argument and closes all of the notifications.