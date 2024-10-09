import React from "react";
import bgImg from "../../../../public/images/request-bg.svg";
import { useDataverseGet } from "@/app/hooks/useDataerse";
import { getAccountId } from "@/app/util/Helper";
import { TriageHeadSection } from "@/app/components/TriageHeadSection";
import { TriageTable } from "@/app/components/TriageTable";

const Triages = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) => {
  let TriageQuery = '';
  let search = searchParams?.search || '';
  if (search) {
    search = search.replace("'", "''")
    TriageQuery = `$select=gp_bookingsummaryid,gp_id,gp_slotstart,gp_symptoms,gp_triageas&$expand=gp_Patient($select=gp_birthday,gp_fullname)&$filter=(_gp_gp_value eq ${getAccountId()} and (contains(gp_id,'${search}') or contains(gp_Patient/gp_fullname,'${search}') or contains(gp_symptoms,'${search}')))`;
  } else {
    TriageQuery = `$select=gp_id,gp_slotstart,gp_isread,gp_symptoms,gp_triageas&$expand=gp_Patient($select=gp_birthday,gp_fullname)&$filter=_gp_gp_value eq ${getAccountId()}&$orderby=gp_slotstart desc`;
  }

  const gp_bookingsummariesTriages = new Promise(async (res, rej) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, success, message } = await useDataverseGet(
      "gp_bookingsummaries", TriageQuery, true

    );
    if (success) {
      res(data);
      return;
    }
    rej({ message });
  });

  const result = (await Promise.allSettled([
    gp_bookingsummariesTriages,
  ])) as any;



  return (
    <>
      <div
        className="p-8 pt-5 flex flex-col gap-12 bg-[#f1f4fa] bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bgImg})`, height: "100%" }}
      >
        <TriageHeadSection
        />
        <div className="h-full">
          <TriageTable TriageData={result[0].value} search={search} isServer={true} key={Math.random()} />
        </div>
      </div>
    </>
  );
};

export default Triages;
