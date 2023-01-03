import Image from "next/image";
import Link from "next/link";

export default function Example() {
  return (
    <div className=" bg-white mt-10 lg:flex md:flex">
      <div className="grid-cols-1 lg:m-10 lg:w-1/2 sm:p-2 m-16 mx-auto w-4/5 md:w-2/5">
        <h1 className="font lg:text-6xl font-bold tracking-tight text-gray-900 text-4xl">
          Summer styles are finally here
        </h1>
        <p className="mt-4 lg:text-xl text-gray-500">
          This year, our new summer collection will shelter you from the harsh
          elements of a world that does not care if you live or die.
        </p>
        <div className="w-36 mt-5 p-2 rounded-md border border-transparent bg-indigo-600 text-center font-medium text-white hover:bg-indigo-700">
          <Link href="/products">Shop Collection</Link>
        </div>
      </div>

      <div className="lg:grid-cols-1 sm:p-2 sm:mb-5 m-12">
          <div className="flex items-center space-x-6 lg:space-x-8 ">
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
            </div>
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-8">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
              <Image
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                alt=""
                className="rounded-lg"
                width="88"
                height="128"
              />
            </div>
          </div>
        </div>
    </div>
  );
}
