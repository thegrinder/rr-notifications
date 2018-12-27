# rr-notifications

rr-notifications is a flexible and customizable redux notification system. Create your own notification component with the content you want, style it however you want and with whatever technology you want and it will work.

## Reducer

Import the reducer and pass it to the store.

``` javascript
import { createStore, combineReducers } from 'redux';
import { reducer as notifications } from 'rr-notifications';

const store = createStore(combineReducers({
  notifications,
}));

export store;
```

## rrNotificationsFactory

rrNotificationsFactory is a higher order component that takes in your custom notification component and returns a wrapper component that takes a number of props that allow you to customize the notifications.

### Props

Prop    | Type   | Default   | Required | Description
:-------|:------:|:---------:|:--------:|:----------------------------------------
position | array | ['40px', '40px', 'auto', 'auto'] | no | Fixed position where notifications are displayed
slideFromSide | 'right', 'left' | undefined | no | Horizontal direction which notification appears from. If not provided, the notification will appear from top or bottom, depending on position prop
dismissAfter | number | 5000 | no | Time in ms after which the notification disappears
animationDuration | number | 400 | no | Duration of the show and hide animation in miliseconds
animationEasing | string | 'ease' | no | Animation timing function / cubic-bezier

### Example

``` javascript
// App.js - root component

import { rrNotificationsFactory } from 'rr-notifications';
import YourNotification from './components/YourNotification';

const Notifications = rrNotificationsFactory(YourNotification);

class App extends Component {
  render() {
    return (
      <div>
        <Notifications
          position={[ 'auto', 'auto', '40px', '40px']}
          animationDuration={400}
          animationEasing="ease"
          slideFromSide="right"
        />
      </div>
    )
  }
}

```

### Props

Thanks to rrNotificationsFactory, your wrapped custom notification component has now access to the following props:

Props | Types | Description
:-----|:-----:|:-----------
options | object | Custom data passed to the notification (see action creators section)
hideNotification | function | Function enabling you to close the current notification

### Example

``` javascript
// YourNotification.js

const YourNotification = (props) => (
  // props available thanks to wrapping the component
  const { options, hideNotification } = props;
  <div>
    <div>Notification</div>
    <button onClick={hideNotification}>Click to close</button>
  </div>
);

export default YourNotification;
```

## Action Creators

There are two different actions creators available to you. `showNotification` takes an options object that is available to you inside your notification under `props.options`. You can pass all the necessary data such as type (warning, success, etc.) and message in that object. `hideAllNotifications` takes no argument and closes all of the notifications.

### Example

``` javascript
// Demo.js
import { actions } from 'rr-notifications';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.showOne = this.showOne.bind(this);
    this.hideAll = this.hideAll.bind(this);
  }
  showOne() {
    const notification = {
      type: 'danger',
      message: 'scary message',
    };
    const { showNotification } = actions;
    this.props.dispatch(showNotification(notification));
  }
  hideAll() {
    const { hideAllNotifications } = actions;
    this.props.dispatch(hideAllNotifications());
  }
  render() {
    return (
      <div>
        <button onClick={this.showOne}>show notfication</button>
        <button onClick={this.hideAll}>hide all notifications</button>
      </div>
    );
  }
}

export default connect()(Demo);

```