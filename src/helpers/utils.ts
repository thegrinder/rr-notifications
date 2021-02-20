type Coordinate = 'top' | 'right' | 'bottom' | 'left';

export type Position = [string, string, string, string];

const COORDINATES: Array<Coordinate> = ['top', 'right', 'bottom', 'left'];

export const convertToCssPosition = (position: Position) =>
  position.reduce(
    (acc, value, index) => ({
      ...acc,
      [COORDINATES[index]]: value,
    }),
    {}
  );

export const convertToCssDuration = (miliseconds: number) =>
  `${(miliseconds / 1000).toString()}s`;

export const getFlexDirection = (position: Position) =>
  position[COORDINATES.indexOf('top')] !== 'auto' ? 'column' : 'column-reverse';

export const getAnimatedMargin = (position: Position) =>
  position[COORDINATES.indexOf('top')] !== 'auto' ? 'top' : 'bottom';

export const capitalize = (string: string) =>
  string[0].toUpperCase() + string.slice(1);
