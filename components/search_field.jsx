import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function SearchField() {
  const router = useRouter();

  const inputCallback = useCallback(inputEl => {
    if (inputEl && router.pathname === '/') inputEl.focus();
  });

  const [searchTerm, setSearchTerm] = useState(router.query.search || '');

  const onFormSubmit = (e) => {
    e.preventDefault();

    router.push({
      pathname: '/items',
      query: { search: searchTerm },
    });
  }

  return (
    <form method="GET" action="/items" autoComplete="off" className="flex items-center flex-grow ml-5" onSubmit={onFormSubmit}>
      <input
        ref={inputCallback}
        value={searchTerm}
        type="text"
        name="search"
        placeholder="Nunca dejes de buscar"
        aria-label="Campo de busca"
        className="w-full p-2 pl-3 rounded-tl-md rounded-bl-md"
        onChange={(el) => setSearchTerm(el.currentTarget.value)}
      />
      <button
        type="submit"
        className="bg-gray-300 p-2 rounded-tr-md rounded-br-md"
      >
        <MagnifyingGlassIcon className="black h-6 w-6" />
      </button>
    </form>
  );
}
