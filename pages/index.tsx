/* eslint-disable @next/next/no-img-element */
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Product } from "../components/Product";

const DATA = {
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industrys standard dummy text ever
  since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only
  five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged. It was popularised in the 1960s with
  the release of Letraset sheets containing Lorem Ipsum passages, and
  more recently with desktop publishing software like Aldus PageMaker
  including versions of Lorem Ipsum.`,
  thumbnailUrl: `https://cdn.masstrade.pl/MassTrade.Production/cache_images/100050/ac_id_6/pids/1263463/prod_1263455_1_582176360_large.jpg?hash=582176360`,
  thumbnailAlt: `opis`,
  rating: 4.5,
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Main >
        <Product data={DATA} />
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
