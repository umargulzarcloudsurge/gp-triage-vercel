  
  // Function to extract symptoms under "Other Problems or Symptoms:"
  export const getSymptoms = (data:any) =>{
    const symptomSummary = data?.gp_triagesummary;

const symptomList = symptomSummary?.split('<br>')
  .filter((item:any) => item.trim().startsWith('- '))
  .map((item:any) => item.trim().slice(2));

return symptomList
}
  

  