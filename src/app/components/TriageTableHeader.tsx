import { Checkbox } from "antd";
import Image from "next/image";
import grayDeleteIcon from "../../../public/images/gray-delete-icon.svg";


export const TriageTableHeader = ()=>{
    return <tr className="flex px-2 gap-1 sm:gap-2 justify-start items-center sticky top-0 h-10  bg-[#f1f4fa] z-[1]">
    <td className="w-[3%]">
      <Checkbox
        // onChange={(e) => handleCheckRow(e, null, "multiSelect")}
        defaultChecked={false}
        // checked={selectAll}
      />
    </td>

    <td className="w-[10%] text-[#4b5769] text-base leading-normal font-medium">
    <div className="flex items-center text-[12px] sm:text-sm" >
    Triage ID
  {/* <a href="#">
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  </a> */}
</div>
    
    </td>
    <td className="w-[17%] text-[#4b5769] text-base leading-normal font-medium">
    <div className="flex justify-start items-center text-[12px] sm:text-sm">
  Name
  {/* <a href="#">
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  </a> */}
</div>
    </td>
    <td className="w-[7%] text-[#4b5769] text-base leading-normal font-medium">
    <div className="flex justify-start items-center text-[12px] sm:text-sm">
  Age
  {/* <a href="#">
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  </a> */}
</div>
    </td>
    <td className="w-[21.16%] text-[#4b5769] text-base leading-normal font-medium ">
    <div className="flex justify-start items-center text-[12px] sm:text-sm">
    Presenting Complaint
  {/* <a href="#">
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  </a> */}
</div>
    </td>
    <td className="w-[19.16%] text-[#4b5769] text-base leading-normal font-medium">
    <div className="flex justify-center items-center text-[12px] sm:text-sm">
  Date
  {/* <a href="#">
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  </a> */}
</div>
    </td>
    <td className="w-[19.16%] text-[#4b5769] text-base leading-normal font-medium">
    <div className="flex justify-center items-center text-[12px] sm:text-sm">
 Status
  {/* <a href="#">
    <svg
      className="w-3 h-3 ms-1.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
    </svg>
  </a> */}
</div> 
    </td>
    <td className="w-[2%] text-[#4b5769] text-base leading-normal font-medium flex justify-end items-center">
      {/* <Image
        src={grayDeleteIcon}
        width={16}
        height={16}
        alt="Icon"
      /> */}
    </td>
  </tr>
}

