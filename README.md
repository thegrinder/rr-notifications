# rr-notifications

rr-notifications is a flexible and customizable react notification system. Create your own notification component with the content you want, style it however you want and with whatever technology you want and it will work.

## NotificationsProvider

Notifications component is just a context provider that takes a few configuration props. The most important is renderNotification that allows for maximum flexibility when creating your own custom notification component.

### Props

Prop    | Type   | Default   | Required | Description
:-------|:------:|:---------:|:--------:|:----------------------------------------
position | array | ['40px', '40px', 'auto', 'auto'] | no | Fixed position where notifications are displayed
slideFromSide | 'right', 'left' | '' | no | Horizontal direction which notification appears from. If not provided, the notification will appear from top or bottom, depending on position prop
dismissAfter | number | 10000 | no | Time in ms after which the notification disappears
animationDuration | number | 400 | no | Duration of the show and hide animation in miliseconds
animationEasing | string | 'ease' | no | Animation timing function / cubic-bezier


### Full Example

``` javascript
// App.js - root component
import { NotificationsProvider } from 'rr-notifications';
import Demo from './path/to/demo';

const app = ({ children }) => (
  <NotificationsProvider
    position={[ 'auto', 'auto', '40px', '40px']}
    animationDuration={400}
    animationEasing="ease"
    slideFromSide="right"
    renderNotification={({ removeNotification, payload }) => (
      <div>
        <p>{payload.text}</p>
        <button type="button" onClick={removeNotification}>
          Click to close
        </button>
      </div>
    )}
  >
    <Demo />
  </NotificationsProvider>
);
```

``` javascript
// Demo.js
import { useContext } from 'react';
import { NotificationsContext } from 'rr-notifications';

const Demo = () => {
  const { showNotification } = useContext(NotificationsContext);
  return (
    <div>
      <button
        type="button"
        onClick={() => showNotification({ text: 'notification' })}
      >
        {'Add notification'}
      </button>
    </div>
  );

export default Demo;
```
