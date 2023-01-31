import { searchFor } from '@/lib/search';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Head from "next/head"
import Link from 'next/link';

export default function Items({ searchResult }) {
  return (
    <>
      <Head>
        <title>Resultados da busca</title>
      </Head>
      <header className="bg-yellow-300 py-3">
        <form method="GET" action="/items" autoComplete="off" className="container mx-auto px-8 flex items-center">
          <div aria-hidden="true" className="bg-auto bg-no-repeat h-7 w-10 mr-5" style={{"background-image": "url('/logo_small.png')"}}></div>
            <input
              type="text"
              name="search"
              placeholder="Nunca dejes de buscar"
              aria-label="Campo de busca"
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

      <main className="bg-gray-200 min-h-screen">
        <div className="container mx-auto px-8 flex flex-col">
          <div className="my-4">
            BREADCRUMB
          </div>

          <div className="bg-white rounded-md p-6">
            {searchResult.items.map(item => (
              <article key={item.id} className="flex items-start align-top" tabindex="0">
                <Link href={`/items/${item.id}`}>
                  <figure>
                    <img src={item.picture} alt={item.title} className="w-40 h-40" tabindex="-1"/>
                  </figure>
                </Link>

                <div className="flex-grow px-4">
                  <p className="text-2xl">
                    $ {new Intl.NumberFormat('es-AR').format(item.price.amount)}
                  </p>
                  <p className="text-lg">
                    <Link href={`/items/${item.id}`} tabindex="0">
                      {item.title}
                    </Link>
                  </p>
                </div>

                <p className="text-md w-40 leading-10">
                  {item.condition}
                </p>

              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const searchResult = await searchFor(query.search);

  return {
    props: {
      searchTerm: query.search,
      searchResult: {
        categories: searchResult.categories,
        items: searchResult.items.slice(0, 4),
      }
    }
  };
}
