type GununganIconProps = {
  className?: string;
};

/**
 * Bentuk gunungan (kayon) wayang — elemen signature yang merepresentasikan
 * makna logo "Es Teh Kulonan": akar budaya Jawa/Solo yang kuat.
 * Dipakai berulang sebagai motif visual, bukan sekadar dekorasi.
 */
export function GununganIcon({ className }: GununganIconProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100 4C120 40 190 70 196 130C198 160 180 190 150 206C160 180 150 150 130 140C140 165 130 190 100 216C70 190 60 165 70 140C50 150 40 180 50 206C20 190 2 160 4 130C10 70 80 40 100 4Z"
        fill="currentColor"
      />
      <path
        d="M100 30C95 55 70 75 60 100"
        stroke="var(--gunungan-line, #FAF3E7)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M100 30C105 55 130 75 140 100"
        stroke="var(--gunungan-line, #FAF3E7)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
