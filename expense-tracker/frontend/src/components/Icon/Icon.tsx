import React, { Suspense, lazy } from 'react';

import styles from './Icon.module.css';

const iconMap = {
  'empty-square': lazy(() => import('../../assets/icons/empty-square.svg?react')),
  'tick-square': lazy(() => import('../../assets/icons/tick-square.svg?react')),
  bell: lazy(() => import('../../assets/icons/bell.svg?react')),
  plus: lazy(() => import('../../assets/icons/plus.svg?react')),
  calendar: lazy(() => import('../../assets/icons/calendar.svg?react')),
};

export type IconName = keyof typeof iconMap;

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  iconName: IconName;
  size?: { width: number; height: number };
}

/**
 * A component to render SVG icons with support for dynamic loading.
 */
export const Icon = ({ iconName, size = { width: 24, height: 24 }, color, style, ...rest }: IconProps) => {
  const IconComponent = iconMap[iconName];

  const iconStyle = {
    width: size.width,
    height: size.height,
    color,
    ...style,
  };

  return (
    <span
      role="img"
      aria-label={iconName}
      className={styles.icon}
      style={iconStyle}
      {...rest}
    >
      <Suspense fallback={<span style={{ width: size.width, height: size.height }} />}>
        {IconComponent && <IconComponent />}
      </Suspense>
    </span>
  );
};
