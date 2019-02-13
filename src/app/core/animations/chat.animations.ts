import {
  trigger,
  animate,
  transition,
  style,
  state,
  query,
  group,
  keyframes
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  state('inactive', style({
    width: '0px',
    display: 'none'
  })),
  state('active', style({
    width: '100%',
    display: 'block'
  }))
]);

export const roomAnimation = trigger('roomAnimation', [
  state('inactive', style({
    width: '0px',
    display: 'none'
  })),
  state('active', style({
    width: '100%',
    display: 'flex'
  }))
]);
