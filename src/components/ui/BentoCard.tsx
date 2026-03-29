import type { ReactNode } from 'react';

interface BentoCardProps {
  children?: ReactNode;
  tag?: string;
  title: string;
  desc: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function BentoCard({ 
  tag, 
  title, 
  desc, 
  className = '', 
  style 
}: BentoCardProps) {
  return (
    <div className={`bento-card ${className}`} style={style}>
      {tag && <span className="b-tag glusp">{tag}</span>}
      <h3 className="glusp">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
