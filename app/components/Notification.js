import styled, { keyframes } from 'styled-components';

const show = height => (
  keyframes`
    0% { 
      margin-bottom: ${-height}px;
      opacity: 0;
    }
    100% { 
      margin-bottom: 0px; 
      opacity: 1;
    }
  `
);

const hide = height => (
  keyframes`
    0% { 
      margin-bottom: 0px; 
      opacity: 1;
    }
    100% { 
      margin-bottom: ${-height}px; 
      opacity: 0;
    }
  `
);

const Notification = styled.div`
  padding: 10px;
  background-color: #ddd;
  color: #fff;
  animation: ${props => (props.isVisible ? show(props.test) : hide(props.test))} .4s forwards;
  z-index: ${props => 999999 - props.index};
  position: relative;
`;

export default Notification;

