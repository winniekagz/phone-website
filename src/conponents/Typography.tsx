

interface TypographyProps {
    id:string
  text: string;
  variant?: "h1" | "h2" | "h3" | "p" | "small"|'hero-title'|'section-heading';
  className?: string; // Allows adding extra styles if needed
}

export function Typography(
    {id, text, variant = "p", className = "" }: TypographyProps) {
  const variantClasses: Record<string, string> = {
    'section-heading':'text-white/30 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20',
    h1: "text-4xl font-bold",
   'hero-title':'font-secondary font-semibold text-secondary text-center max-md:mb-10 opacity-0',
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-medium",
    p: "text-base",
    small: "text-sm text-gray-500",
  };


  return <p id={id} className={`${variantClasses[variant]} ${className}`}>{text}</p>;
}
