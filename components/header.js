import Link from 'next/link';
export function Header() {
  return (
    <div className="flex items-center justify-between max-w-3xl px-8 mx-auto py-4">
      <Link href="/">
        <a className="block font-bold text-lg">TIL 💡</a>
      </Link>
      <a
        target="_blank"
        href="https://twitter.com/whereischarly"
        rel="noopener"
      >
        Follow Me
      </a>
    </div>
  );
}
