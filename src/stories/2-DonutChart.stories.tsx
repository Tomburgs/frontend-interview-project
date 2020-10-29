import React from 'react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import DonutChart from '../components/donut-chart';

export const regular: React.FC = () => (
  <div>
    <DonutChart
      count={text('Count', '10')}
      data={object('Data', [
        { value: 100, color: '#FF9430' },
        { value: 400, color: '#46DB75' },
        { value: 159, color: '#00A9FF' },
        { value: 290, color: '#D53341' },
      ])}
    />
  </div>
);

export default {
  title: 'Chart',
  decorators: [withKnobs],
};
