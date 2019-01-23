import styled from 'styled-components';
import PropTypes from 'prop-types';
import { convertToCssPosition, getFlexDirection } from '../helpers/utils';

const propTypes = {
  position: PropTypes.array.isRequired,
};

const Container = styled.div`
  position: fixed;
  display: flex;
  z-index: 999999;
  height: 0;
  flex-direction: ${props => getFlexDirection(props.position)};
  ${props => convertToCssPosition(props.position)}
`;

Container.propTypes = propTypes;

export default Container;
