const COORDINATES = ['top', 'right', 'bottom', 'left'];

export const convertToCssPosition = (position) =>
  position.reduce(
    (acc, value, index) => ({
      ...acc,
      [COORDINATES[index]]: value,
    }),
    {}
  );

export const convertToCssDuration = (miliseconds) =>
  `${(miliseconds / 1000).toString()}s`;

export const getFlexDirection = (position) =>
  position[COORDINATES.indexOf('top')] !== 'auto' ? 'column' : 'column-reverse';

export const getAnimatedMargin = (position) =>
  position[COORDINATES.indexOf('top')] !== 'auto' ? 'top' : 'bottom';

export const capitalize = (string) => string[0].toUpperCase() + string.slice(1);
