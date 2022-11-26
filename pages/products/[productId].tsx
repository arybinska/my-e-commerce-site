import { gql } from "@apollo/client";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";
import { apolloClient } from "../../graphql/apolloClient";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href="/products">
        <a>Wróć na stronę główną</a>
      </Link>
      <ProductDetails
        data={{
          id: data.slug,
          title: data.name,
          thumbnailUrl: data.images[0].url,
          thumbnailAlt: data.name,
          description: data.description,
          rating: 5,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  interface GetProductsSlugsResponse {
    products: Product[];
  }

  interface Product {
    slug: string;
  }
  const { data } = await apolloClient.query<GetProductsSlugsResponse>({
    query: gql`
      query GetProductsSlugs {
        products {
          slug
        }
      }
    `,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ productId: undefined }>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  interface GetProductDetailsBySlugResponse {
    product: Product;
  }

  interface Product {
    name: string;
    price: number;
    slug: string;
    description: string;
    images: Image[];
  }

  interface Image {
    url: string;
  }
  const { data } = await apolloClient.query<GetProductDetailsBySlugResponse>({
    variables: { slug: params.productId },
    query: gql`
      query GetProductDetailsBySlug($slug: String) {
        product(where: { slug: $slug }) {
          name
          price
          slug
          description
          images(first: 1) {
            url
          }
        }
      }
    `,
  });

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
        description: await serialize(data.product.description),
      },
    },
  };
};
