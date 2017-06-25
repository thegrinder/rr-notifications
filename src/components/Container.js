import styled from 'styled-components';
import { array, string } from 'prop-types';
import { getPosition } from '../helpers/utils';

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
