import React, { FC, CSSProperties } from 'react';
import classnames from 'classnames';
import styles from './score.module.scss';

interface Props {
  score: number;
  size: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const getCSSVariables = (radius: number, score: number): CSSProperties => {
  const circumference = radius * Math.PI * 2;
  const percentage = (circumference * score) / 100;

  return {
    '--circle-percentage': percentage,
    '--circle-circumference': circumference,
  } as CSSProperties;
};

const Score: FC<Props> = (props) => {
  const {
    score,
    size,
    stroke = '#0cce6b',
    strokeWidth = 10,
    className,
    ...otherProps
  } = props;

  const radius = size / 2 - strokeWidth / 2;
  const circleSize = radius + strokeWidth / 2;

  const cssVariables = getCSSVariables(radius, score);
  const rootClass = classnames(
    {
      [styles.root]: true,
      [styles.rootIsEmpty]: score === 0,
    },
    className,
  );

  return (
    <div {...otherProps} className={rootClass} style={cssVariables}>
      <svg height={size} width={size} fill="none">
        <circle
          strokeWidth={strokeWidth}
          r={radius}
          cx={circleSize}
          cy={circleSize}
        />
        <circle
          stroke={stroke}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${circleSize} ${circleSize})`}
          r={radius}
          cx={circleSize}
          cy={circleSize}
        />
      </svg>
      <span aria-label="score">{score}</span>
    </div>
  );
};

export default Score;
