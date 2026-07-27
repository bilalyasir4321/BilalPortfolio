import { useEffect, useState } from 'react';

export default function TypingText({
  words,
  className = '',
  speed = 90,
  pause = 1600,
}: {
  words: string[];
  className?: string;
  speed?: number;
  pause?: number;
}) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];

    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && display === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    }
    const t = setTimeout(() => {
      setDisplay((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
      );
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [display, deleting, index, words, speed, pause]);

  return (
    <span className={className}>
      <span className="text-electric-400">{display}</span>
      <span className="ml-0.5 inline-block h-[1.1em] w-px animate-pulse bg-electric-400 align-middle" />
    </span>
  );
}
