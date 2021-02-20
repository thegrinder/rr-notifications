import React, { useLayoutEffect, useRef, useState, ReactNode } from 'react';
import {
  convertToCssDuration,
  getAnimatedMargin,
  capitalize,
  Position,
} from '../../helpers/utils';

type NotificationProps = {
  position: Position;
  isVisible: boolean;
  animationDuration: number;
  animationEasing: string;
  children: ReactNode;
};

const Notification = ({
  position,
  isVisible,
  animationDuration,
  animationEasing,
  children,
}: NotificationProps) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [height, updateHeight] = useState(0);

  useLayoutEffect(() => {
    if (notificationRef.current) {
      updateHeight(notificationRef.current.clientHeight);
    }
  }, [notificationRef]);

  return (
    <div
      ref={notificationRef}
      style={{
        position: 'relative',
        zIndex: isVisible ? 999999 : -1,
        transitionProperty: `margin-${getAnimatedMargin(position)}, opacity`,
        transitionDuration: convertToCssDuration(animationDuration),
        transitionTimingFunction: animationEasing,
        [`margin${capitalize(getAnimatedMargin(position))}`]: isVisible
          ? 0
          : `${-height}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default Notification;
