"use client"
import Image from 'next/image';
import searchIcon from '../../../public/images/search-icon-2.svg';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';



export const TriageHeadSection = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term.toLowerCase());
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 100)

  return <>
    <div className="flex justify-between md:flex-row flex-col items-center gap-6">
      {/* Header */}
      <p className="text-[#06152B] font-dm-sans md:text-xl text-sm font-bold leading-normal">
        Triage Centre
      </p>
      <div className="flex gap-3 items-center">
        {/* Search */}
        <div className="flex gap-2 bg-white py-3 px-5 rounded-lg h-[44px]">
          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('search')?.toString()}
          />
          <Image src={searchIcon} alt="Icon" width={20} height={20} />
        </div>
        {/* <button className="h-[44px] py-3 px-8 rounded-lg flex gap-2 items-center justiy-center text-white font-dm-sans text-sm font-medium bg-[#0E72B7]">
              <span>+</span>
              <span>Add Task</span>
            </button> */}
      </div>
    </div></>
}

