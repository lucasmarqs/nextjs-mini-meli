import Head from "next/head"
import Link from 'next/link';
import { searchFor } from '@/lib/search';
import Layout from '@/components/layout';
import Breadcrumbs from "@/components/breadcrumbs";

export default function Items({ searchResult, searchTerm, breadcrumb }) {
  return (
    <Layout>
      <Head>
        <title>Resultados para {searchTerm}</title>
      </Head>

      <Breadcrumbs items={["Busca", breadcrumb]} />

      <div className="bg-white rounded-md p-6">
        {searchResult.items.map(item => (
          <article
            key={item.id}
            tabIndex="0"
            className="flex items-start align-top border-b-gray-100 border-b border-solid last:border-none mt-5 first:mt-0"
          >
            <Link href={`/items/${item.id}`} className="mb-4">
              <figure>
                <img src={item.picture} alt={item.title} className="w-40 h-40" tabIndex="-1"/>
              </figure>
            </Link>

            <div className="flex-grow px-4">
              <p className="text-2xl inline-flex">
                $ {new Intl.NumberFormat('es-AR').format(item.price.amount)}
                {item.seller_reputation_level_id === "5_green" &&
                  <span className="h-4 w-4 rounded-xl bg-green-600 ring-green-300 ring-1 self-center mx-4"></span>}
              </p>
              <p className="text-lg max-w-lg">
                <Link href={`/items/${item.id}`} tabIndex="0">
                  {item.title}
                </Link>
              </p>
            </div>

            <p className="w-40 self-center">
              {item.seller_address_state}
            </p>

          </article>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  if (!query.search) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const searchResult = await searchFor(query.search);
  const items = searchResult.items.slice(0, 4);
  const breadcrumb = getBreadcrumbByItems(items);

  return {
    props: {
      searchTerm: query.search,
      searchResult: {
        categories: searchResult.categories,
        items,
      },
      breadcrumb,
    }
  };
}

function getBreadcrumbByItems(items) {
  const categories = new Map();
  items.forEach(item => {
    if (categories.has(item.category_id)) {
      categories.set(item.category_id, categories.get(item.category_id));
    } else {
      categories.set(item.category_id, 1);
    }
  });

  return [ ...categories.entries() ].reduce((acc, el) => {
    return el[1] > acc[1] ? el : acc;
  });
}
