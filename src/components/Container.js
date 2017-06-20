import styled, { css } from 'styled-components';
import { array, string } from 'prop-types';

const COORDINATES = ['top', 'right', 'bottom', 'left'];
const getPosition = css`
  ${props => props.position.map((value, index) => (
    `${COORDINATES[index]}: ${value};`
  ))}
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  z-index: 999999;
  flex-direction: ${props => (props.stackNextOn === 'top' ? 'column-reverse' : 'column')};
  ${getPosition}
`;

Container.propTypes = {
  position: array.isRequired,
  stackNextOn: string.isRequired,
};

export default Container;
