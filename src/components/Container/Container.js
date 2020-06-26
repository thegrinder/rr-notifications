import React from 'react';
import PropTypes from 'prop-types';
import { convertToCssPosition, getFlexDirection } from '../../helpers/utils';

const propTypes = {
  position: PropTypes.array.isRequired,
};

const Container = ({ position, ...rest }) => (
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

Container.propTypes = propTypes;

export default Container;
