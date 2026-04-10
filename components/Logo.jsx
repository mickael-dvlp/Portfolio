import Image from "next/image";

/**
 * Logo — Logo du portfolio chargé depuis public/image/logo/logov1.png
 *
 * @param {string} className - Classes CSS Tailwind supplémentaires
 */
export default function Logo({ className = "w-10 h-10" }) {
  return (
    <Image
      src="/image/logo/logov1.png"
      alt="Logo Mickael MARTONE"
      width={44}
      height={44}
      className={className}
    />
  );
}
