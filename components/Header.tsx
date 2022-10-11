import Link from "next/link";

export const Header = () => {
  return (
    <header className="shadow-sm max-w-screen-xl mx-auto">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex w-0 flex-1 lg:hidden">
          <button
            className="rounded-full bg-gray-100 p-2 text-gray-600"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="h-10 w-20 rounded-lg bg-gray-200"></span>

          <form className="mb-0 hidden lg:flex">
            <div className="relative">
              <input
                className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
                placeholder="Search..."
                type="text"
              />

              <button
                className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600"
                type="submit"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        </div>

        <div className="flex w-0 flex-1 justify-end lg:hidden">
          <button
            className="rounded-full bg-gray-100 p-2 text-gray-500"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <nav className="hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1">
          <Link href="/">
            <a className="text-gray-900">Główna</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-900">About</a>
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-600"
            href=""
          >
            Log in
          </a>
          <a
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
            href=""
          >
            Sign up
          </a>
        </div>
      </div>

      <div className="border-t border-gray-100 lg:hidden ">
        <nav className="gap-8 flex items-center justify-center overflow-x-auto p-4 text-sm font-medium">
          <Link href="/">
            <a className="flex-shrink-0 pl-4 text-gray-900">Główna</a>
          </Link>
          <Link href="/about">
            <a className="flex-shrink-0 pl-4 text-gray-900">About</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};
