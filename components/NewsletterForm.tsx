import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./FormInput";
import { useMutation } from "react-query";

const CheckoutFormSchema = yup
  .object({
    email: yup
      .string()
      .email("Niepoprawny format")
      .required("Adres e-maill nie jest poprawny"),
  })
  .required();
type CheckoutFormData = yup.InferType<typeof CheckoutFormSchema>;

export const NewsletterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(CheckoutFormSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["add-to-newsletter"],
    async mutationFn({ email }: { email: string }) {
      await fetch("http://localhost:3000/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    },
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <form onSubmit={onSubmit} className="col-span-6 m-10">
      <div className="flex justify-center">
        <div className="text-xl font-medium text-black">
          Dołącz do naszej załogi i zdobądź 10% zniżki na kolejne zakupy
        </div>
      </div>
      <div className="mx-auto w-1/2 m-6">
        <Input
          name="email"
          label="Email"
          register={register}
          type="email"
          autoComplete="email"
          errors={errors}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        />
      </div>

      <div className="mx-auto w-1/2 m-5">
        <button className="block w-full rounded-lg bg-black p-2.5 text-sm text-white">
          Try it & Subscribe
        </button>
        {isSubmitted && (
          <p className="text-green-700 text-lx text-center font-semibold mt-4">
            Właśnie dołączyłeś do grona naszej załogi! Bardzo się cieszymy!
            Sprawdź maila!
          </p>
        )}
      </div>
    </form>
  );
};
