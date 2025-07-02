'use client';
import { useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import { useId } from 'react';

interface StrikeProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  gapHeight?: number; // ширина просвета
}

const drawVariants: Variants = {
  normal: {
    pathLength: 1,
    fillOpacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    fillOpacity: [0, 1],
    transition: {
      pathLength: { duration: 0.7, ease: 'easeInOut' },
      fillOpacity: { delay: 0.5, duration: 0.3, ease: 'easeInOut' },
    },
  },
};

const Strike = ({
  width = 22,
  height = 22,
  fill = '#000',
  stroke = '#000',
  strokeWidth = 1,
  gapHeight = 8,
  style,
  ...props
}: StrikeProps) => {
  const controls = useAnimation();

  const maskId = useId();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        ...style,
      }}
      onMouseEnter={() => {
        void controls.start('animate');
      }}
      onMouseLeave={() => {
        void controls.start('normal');
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 22 22"
        style={{ display: 'block', margin: 'auto' }}
        {...props}
      >
        <defs>
          <mask id={maskId}>
            {/* Всё белое - видно, чёрное - прозрачно */}
            {/* Сначала вся область видна */}
            <rect x="0" y="0" width="24" height="24" fill="white" />
            {/* Прозрачный просвет по перечёркивающей линии */}
            <motion.rect
              x="3"
              y="9"
              width="18"
              height={gapHeight}
              rx={gapHeight / 2}
              animate={controls}
              initial="normal"
              fill="black"
            />
          </mask>
        </defs>
        {/* Основная фигура буквы */}
        <motion.path
          d="M10 19h4v-3h-4zM5 4v3h5v3h4V7h5V4z"
          variants={drawVariants}
          animate={controls}
          initial="normal"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          fillOpacity={1}
          strokeLinejoin="miter"
          strokeLinecap="round"
          mask={`url(#${maskId})`}
        />
        {/* Перечёркивающая линия поверх (можно убрать, если нужна только прозрачность) */}
        <motion.path
          d="M3 14h18v-2H3z"
          variants={drawVariants}
          animate={controls}
          initial="normal"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          strokeLinejoin="miter"
          style={{ pointerEvents: 'none' }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export { Strike };
