"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type TableSearchProps = {
  searchString?: string;
};

const TableSearch = ({ searchString }: TableSearchProps) => {
  const [search, setSearch] = useState(searchString || "");
  const router = useRouter();

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getHref = () => {
    if (search === "" || search === null) {
      return "?";
    }
    console.log(encodeURIComponent(search));
    return `?search=${encodeURIComponent(search)}`;
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(getHref());
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={search}
        onChange={handleOnChange}
        onKeyUp={handleOnKeyUp}
        placeholder="Type here..."
        autoFocus
      />

      <Link href={getHref()}>
        <Button>Search</Button>
      </Link>
    </div>
  );
};

export default TableSearch;
