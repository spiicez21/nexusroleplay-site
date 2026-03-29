interface StatusIndicatorProps {
  label: string;
  className?: string;
  pulseColor?: string;
}

export default function StatusIndicator({ 
  label, 
  className = '', 
  pulseColor = '#0f0' 
}: StatusIndicatorProps) {
  return (
    <div className={`status-indicator ${className}`}>
      <div className="pulse-dot" style={{ background: pulseColor, boxShadow: `0 0 8px ${pulseColor}` }} />
      <span className="glusp">{label}</span>
    </div>
  );
}
