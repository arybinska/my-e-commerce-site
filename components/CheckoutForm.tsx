import { useForm } from "react-hook-form";
import CartPage from "../pages/cart";
import { validateCardExpirationDate } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./FormInput";

const CheckoutFormSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    emailAddress: yup.string().email().required(),
    phone: yup.string().required(),
    cardNumber: yup.string().required(),
    cardExpirationDate: yup.string().required(),
    cardCvc: yup.number().required(),
    country: yup.string().required(),
    address: yup.string().required(),
    postalCode: yup.number().required(),
  })
  .required();
type CheckoutFormData = yup.InferType<typeof CheckoutFormSchema>;

export const CheckoutForm = () => {
  const { register, setValue, handleSubmit, formState: { errors } } =
    useForm<CheckoutFormData>({
      resolver: yupResolver(CheckoutFormSchema),
    });
  const onSubmit = handleSubmit((data) => console.log(data));
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
                  placeholder=""
                  autoComplete=""
                  errors={errors}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  register={register}
                  type="text"
                  placeholder=""
                  autoComplete=""
                  errors={errors}
                />
                <Input
                  name="emailAddress"
                  label="Email"
                  register={register}
                  type="email"
                  placeholder=""
                  autoComplete="email"
                  errors={errors}
                />
                <Input
                  name="phone"
                  label="Phone"
                  register={register}
                  placeholder=""
                  type="tel"
                  autoComplete=""
                  errors={errors}
                />

                {
                // Korzystając z yup, dodaj walidację do swojego formularza. Następnie przetłumacz błędy na język polski i skonfiguruj yup tak, aby wyświetlały się Twoje tłumaczenia zamiast oryginałów po angielsku.
                // 
                // 
                /* <div className="col-span-6">
                  <label
                    className="mb-1 block text-sm text-gray-600"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <input
                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
                    type="email"
                    id="email-address"
                    autoComplete="email"
                    {...register("emailAddress", {
                      required: "This field is required",
                    })}
                  />
                  <span role="alert" className="text-red-500 font-bold text-sm">
                    {formState.errors.emailAddress?.message}
                  </span>
                </div> */}

                <fieldset className="col-span-6">
                  <legend className="mb-1 block text-sm text-gray-600">
                    Card Details
                  </legend>
                  <Input
                    name="cardNumber"
                    label=""
                    register={register}
                    placeholder="Card number"
                    type="text"
                    autoComplete="cc-number"
                    errors={errors}
                  />
                  <div className="-space-y-px rounded-lg bg-white shadow-sm">
                    <div className="flex -space-x-px">
                      <div className="flex-1">
                        <Input
                          name="cardExpirationDate"
                          label=""
                          register={register}
                          placeholder="MM / YY"
                          type="text"
                          autoComplete=""
                          errors={errors}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          name="cardExpirationDate"
                          label=""
                          register={register}
                          placeholder="CVC"
                          type="text"
                          autoComplete=""
                          errors={errors}
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
                    label=""
                    register={register}
                    placeholder="Country"
                    type="text"
                    autoComplete=""
                    errors={errors}
                  />
                  <Input
                    name="address"
                    label=""
                    register={register}
                    placeholder="Address"
                    type="text"
                    autoComplete=""
                    errors={errors}
                  />
                  <Input
                    name="postalCode"
                    label=""
                    register={register}
                    placeholder="ZIP/Post Code"
                    type="text"
                    autoComplete="postal-code"
                    errors={errors}
                  />
                </fieldset>

                <div className="col-span-6">
                  <button
                    className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </section>
  );
};
