"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import searchIcon from "../../../public/images/search-icon-2.svg";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

//https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
const SearchComponent = ({ placeholder }: { placeholder: string }) => {

	const [search, setSearch] = useState("");
	const [value] = useDebounce(search, 300);

	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();


	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set('search', value);
		} else {
			params.delete('search');
		}
		replace(`${pathname}?${params.toString()}`);
	}, [value])

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.currentTarget.value as string);
	}

	return (
		<>
			<div className="flex gap-3 items-center">
				{/* Search */}
				<div className="flex gap-2 bg-white py-2 px-3 rounded-lg h-[44px]">
					<input
						type="text"
						placeholder={placeholder}
						className="outline-none"
						value={search}
						onChange={handleSearch}
					/>
					<Image src={searchIcon} width={20} height={20} alt="_search" />
				</div>
			</div>
		</ >
	)
}

export default SearchComponent