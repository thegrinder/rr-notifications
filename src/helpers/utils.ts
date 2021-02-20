type Coordinate = 'top' | 'right' | 'bottom' | 'left';

const COORDINATES: Array<Coordinate> = ['top', 'right', 'bottom', 'left'];

export const convertToCssPosition = (position: Array<string>) =>
  position.reduce(
    (acc, value, index) => ({
      ...acc,
      [COORDINATES[index]]: value,
    }),
    {}
  );

export const convertToCssDuration = (miliseconds: number) =>
  `${(miliseconds / 1000).toString()}s`;

export const getFlexDirection = (position: Array<string>) =>
  position[COORDINATES.indexOf('top')] !== 'auto' ? 'column' : 'column-reverse';

export const getAnimatedMargin = (position: Array<string>) =>
  position[COORDINATES.indexOf('top')] !== 'auto' ? 'top' : 'bottom';

export const capitalize = (string: string) =>
  string[0].toUpperCase() + string.slice(1);
