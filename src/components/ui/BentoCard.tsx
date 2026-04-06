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
  children,
  style 
}: BentoCardProps) {
  return (
    <div className={`glass-card ${className}`} style={style}>
      <div className="card-content">
        {tag && <span className="b-tag glusp fw-slim">{tag}</span>}
        <h3 className="glusp fw-bold" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
        <p className="fw-slim" style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>{desc}</p>
        {children}
      </div>
      <div className="card-glint" />
    </div>
  );
}
