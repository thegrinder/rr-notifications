import { css } from 'styled-components';

const COORDINATES = ['top', 'right', 'bottom', 'left'];
export const getPosition = css`
  ${props => props.position.map((value, index) => (
    `${COORDINATES[index]}: ${value};`
  ))}
`;

export const getCssDuration = css`
  animation-duration: ${props => `${(props.animationDuration / 1000).toString()}s`};
`;
