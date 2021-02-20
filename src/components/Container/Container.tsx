import React, { HTMLAttributes } from 'react';
import {
  convertToCssPosition,
  getFlexDirection,
  Position,
} from '../../helpers/utils';

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  position: Position;
};

const Container = ({ position, ...rest }: ContainerProps) => (
  <div
    style={{
      position: 'fixed',
      display: 'flex',
      zIndex: 999999,
      height: 0,
      flexDirection: getFlexDirection(position),
      ...convertToCssPosition(position),
    }}
    {...rest}
  />
);

export default Container;
