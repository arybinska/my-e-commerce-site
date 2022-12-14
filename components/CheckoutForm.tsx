import { useForm } from "react-hook-form";
import CartPage from "../pages/cart";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./FormInput";
import { validateCardExpirationDate, validatePostalCode } from "../utils";
import { useCreateCheckoutOrderMutation } from "../generated/graphql";

const CheckoutFormSchema = yup
  .object({
    firstName: yup
      .string()
      .required()
      .min(3, "Imię jest za krótkie")
      .max(20, "Imię jest za długie"),
    lastName: yup
      .string()
      .required()
      .min(3, "Nazwisko jest za krótkie")
      .max(20, "Nazwisko jest za długie"),
    emailAddress: yup
      .string()
      .email("Niepoprawny format")
      .required("Adres e-maill nie jest poprawny"),
    phone: yup
      .string()
      .required()
      .length(9, "Numer telefonu musi zawierać 9 cyfr")
      .matches(/^[0-9]+$/, "Numer składa się tylko z cyfr"),
    cardNumber: yup
      .string()
      .required("Numer konta jest obowiązkowy")
      .length(16, "Podaj 16 cyfr"),
    cardExpirationDate: yup
      .string()
      .test("test daty", "Zły format daty", validateCardExpirationDate)
      .required(),
    cardCvc: yup
      .string()
      .required()
      .min(3, "Numer wymagany")
      .max(4, "Numer wymagany")
      .matches(/^[0-9]+$/, "Numer powinien składać się tylko z cyfr"),
    country: yup.string().required(),
    address: yup.string().required(),
    postalCode: yup
      .string()
      .required()
      .test("test postalCode", "Zły kod pocztowy", validatePostalCode)
      .matches(/\d{2}-\d{3}/, "Zły kod pocztowy"),
  })
  .required();
type CheckoutFormData = yup.InferType<typeof CheckoutFormSchema>;

export const CheckoutForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(CheckoutFormSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  const [createCheckout, createCheckoutResult] =
    useCreateCheckoutOrderMutation();
  const addOrder = () =>
    createCheckout({
      variables: {
        order: {
          firstName: "firstname",
          lastName: "lastname",
          emailAddress: "email@sas.com",
          phone: "677888888",
          cardNumber: "1234567891234567",
          cardCvc: "222",
          cardExpirationDate: "12/24",
          country: "Poland",
          address: "Gdzieś",
          postalCode: "33-455",
        },
      },
    });
  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <CartPage />
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <form onSubmit={onSubmit} className="grid grid-cols-6 gap-4">
              <Input
                name="firstName"
                label="First Name"
                register={register}
                type="text"
                errors={errors}
              />
              <Input
                name="lastName"
                label="Last Name"
                register={register}
                type="text"
                errors={errors}
                pattern="/^[A-Za-z]+$/i"
              />
              <Input
                name="emailAddress"
                label="Email"
                register={register}
                type="email"
                autoComplete="email"
                errors={errors}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              />
              <Input
                name="phone"
                label="Phone"
                register={register}
                placeholder="+48"
                type="tel"
                errors={errors}
              />

              <fieldset className="col-span-6">
                <legend className="mb-1 block text-sm text-gray-600">
                  Card Details
                </legend>
                <Input
                  name="cardNumber"
                  register={register}
                  placeholder="Card number"
                  type="text"
                  autoComplete="cc-number"
                  errors={errors}
                  maxLength={16}
                />
                <div className="-space-y-px rounded-lg bg-white shadow-sm">
                  <div className="flex -space-x-px">
                    <div className="flex-1">
                      <Input
                        name="cardExpirationDate"
                        register={register}
                        placeholder="MM / YY"
                        type="text"
                        errors={errors}
                        pattern="/\b(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})\b/"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        name="cardCvc"
                        register={register}
                        placeholder="CVC"
                        type="text"
                        errors={errors}
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className="col-span-6">
                <legend className="mb-1 block text-sm text-gray-600">
                  Billing Address
                </legend>
                <Input
                  name="country"
                  register={register}
                  placeholder="Country"
                  type="text"
                  errors={errors}
                />
                <Input
                  name="address"
                  register={register}
                  placeholder="Address"
                  type="text"
                  errors={errors}
                />
                <Input
                  name="postalCode"
                  register={register}
                  placeholder="ZIP/Post Code"
                  type="text"
                  autoComplete="postal-code"
                  errors={errors}
                  pattern="d{2}-d{3}"
                />
              </fieldset>

              <div className="col-span-6 m-5">
                <button
                  className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
                  type="button"
                  onClick={addOrder}
                >
                  Checkout
                </button>
                {createCheckoutResult.loading && (
                  <div className="animate-bounce text-3xl">Ładowanko...</div>
                )}
                {createCheckoutResult.error && (
                  <p>Coś poszło nie tak</p>
                )}
                {createCheckoutResult.data && (
                  <p>Zamówienie zostało złożone </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
