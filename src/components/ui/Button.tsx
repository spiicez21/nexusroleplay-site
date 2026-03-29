import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'normal' | 'large';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'normal',
  href, 
  onClick,
  className = '' 
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = variant === 'ghost' ? 'btn-ghost' : variant === 'outline' ? 'btn-outline' : '';
  const sizeClass = size === 'large' ? 'btn-large' : '';
  
  const fullClassName = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={fullClassName} onClick={onClick}>
        <span className="glusp">{children}</span>
      </a>
    );
  }

  return (
    <button className={fullClassName} onClick={onClick}>
      <span className="glusp">{children}</span>
    </button>
  );
}
