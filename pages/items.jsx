import Head from "next/head"
import Link from 'next/link';
import { searchFor } from '@/lib/search';
import Layout from '@/components/layout';

export default function Items({ searchResult, searchTerm }) {
  return (
    <Layout>
      <Head>
        <title>Resultados para {searchTerm}</title>
      </Head>

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
    </Layout>
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
