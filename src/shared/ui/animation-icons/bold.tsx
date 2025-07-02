'use client';
import { useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import * as motion from 'motion/react-client';

interface BoldProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
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
      pathLength: { duration: 0.8, ease: 'easeInOut' },
      fillOpacity: { delay: 0.5, duration: 0.3, ease: 'easeInOut' },
    },
  },
};

const Bold = ({
  width = 22,
  height = 22,
  fill = '#000',
  stroke = '#000',
  strokeWidth = 1,
  style,
  ...props
}: BoldProps) => {
  const controls = useAnimation();

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
        <motion.path
          d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42M10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"
          variants={drawVariants}
          animate={controls}
          initial="normal"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          fillOpacity={1}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export { Bold };
