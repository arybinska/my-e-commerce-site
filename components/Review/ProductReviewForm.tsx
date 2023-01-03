import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../FormInput";
import {
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
  useCreateProductReviewMutation,
} from "../../generated/graphql";
import { useState } from "react";

const ReviewFormSchema = yup
  .object({
    content: yup.string().required("Treść wymagana"),
    headline: yup.string().required("Tytuł wymagany"),
    name: yup.string().required("Nick wymagany"),
    email: yup
      .string()
      .email("Niepoprawny format")
      .required("Adres e-maill nie jest poprawny"),
    rating: yup.number().min(1).max(5).required("Ocena wymagana"),
  })
  .required();
type CheckoutFormData = yup.InferType<typeof ReviewFormSchema>;

interface ProductReviewFormProps {
  productSlug: string;
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(ReviewFormSchema),
  });

  const [createReview, createReviewResult] = useCreateProductReviewMutation({
    // refetchQueries: [
    //   {
    //     query: GetReviewsForProductSlugDocument,
    //     variables: { slug: productSlug },
    //   },
    // ],
    update(cache, result) {
      result.data;
      const originalReviewQuery =
        cache.readQuery<GetReviewsForProductSlugQuery>({
          query: GetReviewsForProductSlugDocument,
          variables: { slug: productSlug },
        }); //ręcznie bierzemy dane z cacha
      if (!originalReviewQuery?.product?.reviews || !result.data?.review) {
        //...
        return;
      }

      const newReviewsQuery = {
        ...originalReviewQuery,
        product: {
          ...originalReviewQuery.product,
          reviews: [
            ...originalReviewQuery.product?.reviews,
            result.data.review,
          ],
        },
      }; // musimy zrobić kopię, gdyż originalReviewQuery nie można mutować; są to dane z optimisticResponse; modyfikujemy, dodajemy te dane

      console.log(newReviewsQuery);

      cache.writeQuery({
        query: GetReviewsForProductSlugDocument,
        variables: { slug: productSlug },
        data: newReviewsQuery,
      }); // zapisujemy ponownie do cachu
    },
  });

  const onSubmit = handleSubmit((data) => {
    createReview({
      variables: {
        review: { ...data, product: { connect: { slug: productSlug } } },
      }, //tutaj wysyłamy do serwera
      optimisticResponse: {
        __typename: "Mutation",
        review: {
          __typename: "Review",
          id: (-Math.random()).toString(), //cokolwiek bo i tak serwer nada nam id, nadajemy kształt tymczasowy
          ...data,
        },
      }, //tutaj jednocześnie tworzymy tymczasowe dane, w momencie gdy dane idą do serwera; aktualizujemy widok danymi, następnie dane trafiają do funkcji update
    });
  });
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };
  return (
    <>
      <div className="mx-auto w-1/2 m-5">
        <button
          className={
            !isActive
              ? "block w-full rounded-lg bg-black p-3 text-m text-white"
              : "text-black bg-white block w-full rounded-lg p-3 text-m"
          }
          onClick={handleClick}
        >
          Dodaj komentarz
        </button>
      </div>

      <div className={isActive ? "mx-auto" : "hidden"}>
        <form onSubmit={onSubmit} className="col-span-6 m-10 mt-2 bg-gr">
          <Input
            name="content"
            label="Komentarz"
            register={register}
            type="text"
            errors={errors}
          />
          <Input
            name="headline"
            label="Tytuł"
            register={register}
            type="text"
            errors={errors}
          />
          <Input
            name="name"
            label="Imię"
            register={register}
            type="text"
            errors={errors}
          />
          <Input
            name="email"
            label="Email"
            register={register}
            type="email"
            errors={errors}
          />
          <Input
            name="rating"
            label="Ocena"
            register={register}
            type="number"
            errors={errors}
          />
          <div className="mx-auto w-1/2 m-5">
            <button className="block w-full rounded-lg bg-black p-2.5 text-sm text-white">
              Wyślij
            </button>
          </div>
          {createReviewResult.loading && (
            <div className="text-center animate-bounce text-lx">Ładowanko...</div>
          )}
          {createReviewResult.error && (
            <p className="text-red-600 text-lx text-center font-semibold">
              Coś poszło nie tak. Spróbuj jeszcze raz.
            </p>
          )}
          {createReviewResult.data && (
            <p className="text-green-700 text-lx text-center font-semibold">
              Twój komentarz został dodany.
            </p>
          )}
        </form>
      </div>
    </>
  );
};
