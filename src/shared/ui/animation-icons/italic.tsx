'use client';
import { useAnimation } from 'motion/react';
import type { Variants } from 'motion/react';
import * as motion from 'motion/react-client';

interface ItalicProps extends React.SVGAttributes<SVGSVGElement> {
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

const Italic = ({
  width = 22,
  height = 22,
  fill = '#000',
  stroke = '#000',
  strokeWidth = 1,
  style,
  ...props
}: ItalicProps) => {
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
          d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"
          variants={drawVariants}
          animate={controls}
          initial="normal"
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          strokeLinecap="round"
          fillOpacity={1}
        />
      </svg>
    </div>
  );
};

export { Italic };
