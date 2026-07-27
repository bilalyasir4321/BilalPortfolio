import { type ReactNode } from 'react';
import { Tilt } from 'react-tilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  max = 12,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  return (
    <Tilt
      className={className}
      options={{ max, scale, speed: 800, glare, 'max-glare': 0.25 }}
    >
      {children}
    </Tilt>
  );
}
