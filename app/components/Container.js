import styled from 'styled-components';
import { position } from 'polished';
import { array, string } from 'prop-types';

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: ${props => (props.stackNextOn === 'top' ? 'column-reverse' : 'column')};
  ${props => position(...props.position)}
`;

Container.propTypes = {
  position: array.isRequired,
  stackNextOn: string.isRequired,
};

export default Container;
