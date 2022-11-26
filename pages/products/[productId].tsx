import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { ProductDetails } from "../../components/Product";
import { GetProductDetailsBySlugDocument, GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables, GetProductsSlugsDocument, GetProductsSlugsQuery } from "../../generated/graphql";
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
  const { data } = await apolloClient.query<GetProductsSlugsQuery>({
    query: GetProductsSlugsDocument
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

  const { data } = await apolloClient.query<GetProductDetailsBySlugQuery, GetProductDetailsBySlugQueryVariables>({
    variables: { slug: params.productId },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data.product) {
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
