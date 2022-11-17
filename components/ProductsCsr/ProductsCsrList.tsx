import { Prod } from '../Prod';
import { ProductsLayout } from '../ProductsLayout';
import { useProductsForPage } from './useProducts';

interface ProductsCsrProps {
  page: number;
}

export const ProductsCsrList = ({ page }: ProductsCsrProps) => {
  const result = useProductsForPage(page);

  return (
    <ProductsLayout>
      {result.data!.map((product) => (
        <Prod
          key={product.id}
          href={`/${product.id}`}
          name={product.title}
          thumbnailUrl={product.image}
          price={product.price.toString()}
          variants={`${product.rating.rate} (${product.rating.count})`}
        />
      ))}
    </ProductsLayout>
  );
};