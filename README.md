# rr-notifications

## Basic usage


## notificationFactory

notificationFactory is a higher order function that accepts your custom Notification component and makes the following props available to it.

Props | Types | Description
:-----|:-----:|:-----------
notificationHeight | number | Dynamically obtained height of the notification
isVisible | boolean | Whether the notification is visible. The initial value for a new notification is `true`. That's why if you want a custom animation, use css keyframes that let you define initial animation state
animationDuration | string | Animation duration passed down from the reduxNotificationsFactory options
hideNotification | function | Function enabling you to close the current notification

### Example

```js
import { notificationFactory } from 'rr-notifications';

const YourCustomNotification = (props) => (
  // props available thanks to wrapping the component
  const { notificationHeight, isVisible, animationDuration, hideNotification } = props;
  <div>
    <div>Notification</div>
    <button onClick={hideNotification}>Click to close</button>
  </div>
);

export default notificationFactory(YourCustomNotification);
```


## reduxNotificationsFactory


reduxNotificationsFactory is a higher order function that accepts a wrapped Notification component (see above) and a number of options. It creates a container for the notifications according to the options you pass.

### Options

Property    | Type   | Default   | Required | Description
:-----------|:------:|:---------:|:--------:|:----------------------------------------
position | array | ['40px', '40px', 'auto', 'auto'] | no | Fixed position where notifications are displayed
stackNextOn | 'bottom', 'top' | 'top' | no | Position of the new notification in the stack
slideFromSide | 'right', 'left' | 'right' | no | Horizontal direction which notification appears from
animationDuration | string | '.4s' | no | Duration of the show and hide animation
animationEasing | string | 'ease' | no | Animation timing function / cubic-bezier

### Example

```js
// App.js - root component

import { reduxNotificationsFactory } from 'rr-notifications';
// import your wrapped custom notification component - see notificationFactory section
import WrappedNotification from './components/YourCustomNotification';

const Notifications = reduxNotificationsFactory(WrappedNotification, {
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

