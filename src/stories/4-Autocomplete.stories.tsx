import React, { FC } from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { Store, withState } from '@sambego/storybook-state';
import Autocomplete from '../components/autocomplete';

interface Props {
  selected: string;
  setSelected: (selected: string) => void;
}

const store = new Store({
  selected: 'B1',
  setSelected: (selected: string): void => {
    store.set({ selected });
  },
});

addDecorator(withState());
addParameters({ state: { store } });

export default {
  title: 'Autocomplete',
};

const AutocompletePreview: FC<Props> = (props) => {
  const { selected, setSelected } = props;

  const items = [
    { name: 'Grapefruit', value: 'G1' },
    { name: 'Pineapple', value: 'P1' },
    { name: 'Avocado', value: 'A1' },
    { name: 'Blueberries', value: 'B1' },
    { name: 'Apples', value: 'A2' },
    { name: 'Bananas', value: 'B2' },
  ];

  return (
    <div style={{ width: '200px' }}>
      <Autocomplete
        items={items}
        selected={selected}
        onSelect={setSelected}
        placeholder="Oh, fruity fruit."
      />
    </div>
  );
};

export const Regular = (): FC<Props> => AutocompletePreview;
