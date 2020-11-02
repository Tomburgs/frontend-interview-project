import React, {
  FC,
  useRef,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  useEffect,
  RefObject,
} from 'react';
import classnames from 'classnames';
import styles from './autocomplete.module.scss';

interface Item {
  name: string;
  value: string;
}

interface Props {
  items: Array<Item>;
  selected: Item['value'];
  onSelect: (value: Item['value']) => void;
  placeholder?: string;
  className?: string;
}

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
): void => {
  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      // Check if the mouse click was within the element's ref.
      if (!ref?.current?.contains(event?.target as Node)) {
        callback();
      }
    };

    // Listen for a click anywhere on the window.
    window.addEventListener('mousedown', handler);

    // On un-mount remove event listener.
    return (): void => {
      window.addEventListener('mousedown', handler);
    };
  }, [ref, callback]);
};

const useAutocomplete = (
  items: Array<Item>,
  selected: Item['value'],
): [string, Array<Item>, (search: string) => void] => {
  // If there's selected value passed on-mount, set it as the search value.
  const initialValue = useMemo(
    () => items.find(({ value }: Item) => value === selected),
    [items, selected],
  );

  const [search, setSearch] = useState(initialValue?.name || '');

  // Find results that start with the search value
  const results = useMemo(
    () => items.filter(({ name }) => name.startsWith(search)),
    [search, items],
  );

  return [search, results, setSearch];
};

/*
 * @description Set element's value to callback function
 */
const setFieldValue = (
  callback: (value: string) => void,
): ((value: ChangeEvent<HTMLInputElement>) => void) => ({
  target: { value },
}): void => callback(value);

const Autocomplete: FC<Props> = (props) => {
  const {
    items,
    selected,
    onSelect,
    placeholder,
    className,
    ...otherProps
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, results, setSearch] = useAutocomplete(items, selected);
  const [firstItem] = results;

  const setShowDropdown = useCallback(() => setIsDropdownOpen(true), [
    setIsDropdownOpen,
  ]);

  const setSelected = useCallback(
    (item: Item) => {
      const { name, value } = item;

      inputRef.current?.focus();

      setIsDropdownOpen(false);
      setSearch(name);
      onSelect(value);
    },
    [setIsDropdownOpen, setSearch, onSelect],
  );

  const setSearchFromEvent = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const setSearchValueFromEvent = setFieldValue(setSearch);

      setIsDropdownOpen(true);
      setSearchValueFromEvent(event);
    },
    [setIsDropdownOpen, setSearch],
  );

  const rootClass = classnames(
    {
      [styles.root]: true,
      [styles.rootIsOpen]: isDropdownOpen,
      [styles.rootIsEmpty]: search === '',
      [styles.rootIsComplete]:
        firstItem?.value === selected && firstItem?.name === search,
    },
    className,
  );

  useOutsideClick(rootRef, () => {
    setIsDropdownOpen(false);

    /*
     * If on outside click the search matches
     * any item, set it as selected.
     */
    const selectedItem = items.find(({ name }) => name === search);

    if (selectedItem) {
      onSelect(selectedItem.value);
    }
  });

  return (
    <div {...otherProps} className={rootClass} ref={rootRef}>
      <div className={styles.wrapper}>
        <input
          type="text"
          ref={inputRef}
          value={search}
          placeholder={placeholder}
          onClick={setShowDropdown}
          onFocus={setShowDropdown}
          onChange={setSearchFromEvent}
        />
        <ul>
          {results.map((item: Item) => {
            const { name, value } = item;

            const select = (): void => setSelected(item);
            const isSelected = selected === value;

            return (
              <li
                key={value}
                role="option"
                aria-selected={isSelected}
                onKeyDown={select}
                onClick={select}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Autocomplete;
