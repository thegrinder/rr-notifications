import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getPosition } from '../helpers/utils';

const Container = styled.div`
  position: fixed;
  display: flex;
  z-index: 999999;
  flex-direction: ${props => (props.stackNextOn === 'top' ? 'column-reverse' : 'column')};
  ${getPosition}
`;

Container.propTypes = {
  position: PropTypes.array.isRequired,
  stackNextOn: PropTypes.string.isRequired,
};

export default Container;
