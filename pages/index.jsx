import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import { useCallback } from 'react';

export default function Home() {
  const inputCallback = useCallback(inputEl => {
    if (inputEl) inputEl.focus();
  });

  return (
    <>
      <Head>
        <title>Campo de busca</title>
      </Head>
      <header className="bg-yellow-300 py-3">
        <form method="GET" action="/items" autoComplete="off" className="container mx-auto flex items-center justify-center">
          <div aria-hidden="true" className="bg-auto bg-no-repeat h-7 w-10 mr-5" style={{"background-image": "url('/logo_small.png')"}}></div>
            <input
              type="text"
              name="search"
              placeholder="Nunca dejes de buscar"
              aria-label="Campo de busca"
              ref={inputCallback}
              className="w-2/3 p-2 pl-3 rounded-tl-md rounded-bl-md"
            />
            <button
              type="submit"
              className="bg-gray-300 p-2 rounded-tr-md rounded-br-md"
            >
              <MagnifyingGlassIcon className="black h-6 w-6" />
            </button>
          </form>
      </header>
    </>
  )
}
