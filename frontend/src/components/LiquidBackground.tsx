import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';

// Create SVG blobs with the juice theme colors
const BlobContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Blob = styled(motion.div)<{
  size: number;
  color: string;
  top: number;
  left: number;
}>`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 43% 57% 70% 30% / 30% 40% 60% 70%;
  background: ${props => props.color};
  opacity: 0.3;
  filter: blur(30px);
`;

// Animation variants for blobs
const blobVariants = {
  initial: (custom: number) => ({
    borderRadius: "43% 57% 70% 30% / 30% 40% 60% 70%",
  }),
  animate: (custom: number) => ({
    borderRadius: [
      "43% 57% 70% 30% / 30% 40% 60% 70%",
      "53% 47% 30% 70% / 50% 60% 40% 50%",
      "33% 67% 60% 40% / 40% 30% 70% 60%",
      "43% 57% 70% 30% / 30% 40% 60% 70%",
    ],
    y: [0, custom, -custom, 0],
    x: [0, -custom, custom, 0],
    transition: {
      duration: 15 + Math.random() * 10,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

// Colors for blobs - updated to limegreen and yellow on black/purple
const blobColors = [
  '#90EE90', // Limegreen
  '#CCFF00', // Chartreuse
  '#ADFF2F', // GreenYellow
  '#FFFF00', // Yellow
  '#5D3FD3', // Purple
  '#483D8B', // DarkSlateBlue
  '#4B0082', // Indigo
];

// Blob configuration
const blobs = [
  { size: 600, color: blobColors[0], top: 20, left: 10, moveAmount: 10 },
  { size: 500, color: blobColors[1], top: 50, left: 70, moveAmount: 15 },
  { size: 450, color: blobColors[2], top: 70, left: 40, moveAmount: 20 },
  { size: 550, color: blobColors[3], top: 30, left: 80, moveAmount: 12 },
  { size: 400, color: blobColors[4], top: 80, left: 20, moveAmount: 18 },
  { size: 380, color: blobColors[5], top: 10, left: 50, moveAmount: 14 },
  { size: 480, color: blobColors[6], top: 60, left: 5, moveAmount: 16 },
];

const LiquidBackground: React.FC = () => {
  return (
    <BlobContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1.5 }}
    >
      {blobs.map((blob, index) => (
        <Blob
          key={index}
          size={blob.size}
          color={blob.color}
          top={blob.top}
          left={blob.left}
          custom={blob.moveAmount}
          variants={blobVariants}
          initial="initial"
          animate="animate"
        />
      ))}
    </BlobContainer>
  );
};

export default LiquidBackground; 