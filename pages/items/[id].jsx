import Head from "next/head";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { fetchItem } from "@/lib/items";

export default function ItemId({ item }) {
  return (
    <>
      <Head>
        <title>Detalhe do produto</title>
      </Head>
      <header className="bg-yellow-300 py-3">
        <form method="GET" action="/items" autoComplete="off" className="max-w-5xl mx-auto flex items-center">
          <div aria-hidden="true" className="bg-auto bg-no-repeat h-7 w-10 pr-10 mr-5" style={{"background-image": "url('/logo_small.png')"}}></div>
          <input
            type="text"
            name="search"
            placeholder="Nunca dejes de buscar"
            aria-label="Campo de busca"
            className="w-full p-2 pl-3 rounded-tl-md rounded-bl-md"
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
        <div className="max-w-5xl mx-auto flex flex-col">
          <div className="my-4">
            BREADCRUMB
          </div>

          <article className="bg-white rounded-md p-6 mb-4">
            <div className="flex">
              <div className="flex justify-center flex-grow">
                <figure>
                  <img src={item.picture} alt={item.title} className="w-full"/>
                </figure>
              </div>

              <section className="w-96">
                <p>
                  {item.condition} - {item.sold_quantity} vendidos
                </p>
                <p className="font-bold text-xl">{item.title}</p>
                <h1 className="text-4xl pt-6 pb-9">
                  $ {new Intl.NumberFormat('es-AR').format(item.price.amount)}
                  <span className="text-lg align-top">{item.price.decimals.toString().padStart(2, '0')}</span>
                </h1>

                <button
                  type="button"
                  className="bg-sky-600 hover:bg-sky-500 text-white block min-w-full p-4 rounded-md"
                >
                  Comprar
                </button>
              </section>
            </div>

            <section>
              <h2 className="font-bold text-2xl mt-10 mb-4">Descripción del producto</h2>
              <p className="whitespace-pre-line">{item.description}</p>
            </section>
          </article>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const itemData = await fetchItem(query.id);

  return {
    props: {
      searchTerm: query.search || null,
      item: itemData.item,
    }
  };
}
