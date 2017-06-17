import styled from 'styled-components';
import { position } from 'polished';
import { array } from 'prop-types';

const Container = styled.div`
  position: fixed;
  display: flex;
  ${props => position(...props.position)}
  flex-direction: column-reverse;
`;

Container.propTypes = {
  position: array.isRequired,
};

export default Container;
