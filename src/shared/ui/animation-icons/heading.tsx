'use client';
import { useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import * as motion from 'motion/react-client';

interface HeadingProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
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
      pathLength: {
        duration: 0.7,
        ease: 'easeInOut',
      },
      fillOpacity: {
        delay: 0.5,
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  },
};

const Heading = ({
  width = 22,
  height = 22,
  fill = '#000',
  stroke = '#000',
  strokeWidth = 1,
  style,
  ...props
}: HeadingProps) => {
  const controls = useAnimation();

  const hPath = 'M4 3 v16 h4 v-6 h6 v6 h4 v-16 h-4 v6 h-6 v-6 z';

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
          d={hPath}
          variants={drawVariants}
          animate={controls}
          initial="normal"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export { Heading };
