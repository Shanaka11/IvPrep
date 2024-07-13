"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type TableSearchProps = {
  searchString?: string;
};

const TableSearch = ({ searchString }: TableSearchProps) => {
  const [search, setSearch] = useState(searchString || "");

  const handleOnChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getHref = () => {
    console.log(search);
    if (search === "" || search === null) {
      return "?";
    }
    return `?search=${search}`;
  };

  return (
    <div className="flex gap-2">
      <Input
        value={search}
        onChange={handleOnChange}
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
