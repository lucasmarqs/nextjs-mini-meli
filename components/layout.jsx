import Link from 'next/link';
import SearchField from './search_field';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-yellow-300 py-3">
        <div className="flex max-w-5xl mx-auto items-center">
          <Link href="/">
            <span aria-hidden="true" className="bg-auto bg-no-repeat h-7 w-10 flex" style={{backgroundImage: "url('/logo_small.png')"}}></span>
          </Link>
          <SearchField />
        </div>
      </header>

      <main className="max-w-5xl mx-auto flex flex-col">
        {children}
      </main>
    </div>
  );
}
