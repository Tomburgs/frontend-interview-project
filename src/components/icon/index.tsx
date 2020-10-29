import React from 'react';
import classnames from 'classnames';
import '@fortawesome/fontawesome-free/css/all.css';

interface Props {
  className?: Optional<string>;
  name: string;
  isSolid?: boolean;
  isBrand?: boolean;
}

const Icon: React.FC<Props> = (props) => {
  const { name, className, isSolid, isBrand } = props;

  const fa = !isSolid && !isBrand;
  const fas = isSolid && !isBrand;
  const fab = !isSolid && isBrand;

  const rootClass = classnames(
    {
      fa,
      fas,
      fab,
      [`fa-${name.replace('fa-', '')}`]: true,
    },
    className,
  );

  return <i className={rootClass} />;
};

export default Icon;
