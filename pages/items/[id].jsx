import Head from "next/head";
import { fetchItem } from "@/lib/items";
import Layout from "@/components/layout";
import Breadcrumbs from "@/components/breadcrumbs";

export default function ItemId({ item }) {
  return (
    <Layout>
      <Head>
        <title>{item.title}</title>
        <meta
          name="description"
          content={item.description.substring(0, 140)}
        />
        <meta
          property="og:image"
          content={item.picture}
        />
        <meta name="og:title" content={item.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Breadcrumbs items={[item.category_id]} />

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
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const itemData = await fetchItem(query.id);

  if (!itemData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      searchTerm: query.search || null,
      item: itemData.item,
    }
  };
}
