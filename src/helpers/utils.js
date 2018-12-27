import { css } from 'styled-components';

const COORDINATES = ['top', 'right', 'bottom', 'left'];

export const convertToCssPosition = position => position.map((value, index) => (
  `${COORDINATES[index]}: ${value};`
));

export const convertToCssDuration = miliseconds => `${(miliseconds / 1000).toString()}s`;

export const getDuration = css`
  animation-duration: ${props => convertToCssDuration(props.animationDuration)};
`;

export const getFlexDirection = position => (
  position[COORDINATES.indexOf('top')] !== 'auto'
    ? 'column'
    : 'column-reverse'
);
