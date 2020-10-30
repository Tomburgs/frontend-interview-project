import React, { FC } from 'react';
import { withKnobs, number, color } from '@storybook/addon-knobs';
import Score from '../components/score';

export default {
  title: 'Score',
  decorators: [withKnobs],
};

export const Regular: FC = () => (
  <div>
    <Score
      score={number('Score', 85)}
      size={number('Size', 72)}
      stroke={color('Stroke', '#0cce6b')}
      strokeWidth={number('Stroke Width', 10)}
    />
  </div>
);
