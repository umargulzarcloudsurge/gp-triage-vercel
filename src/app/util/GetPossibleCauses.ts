export const  getPossibleCauses = (data:any) => {
    const triageSummary = data?.gp_triagesummary;
    const possibleCausesStartIndex = triageSummary?.indexOf('<b>Possible Causes:</b>');
    
    if (possibleCausesStartIndex !== -1) {
      const possibleCausesSection = triageSummary?.slice(possibleCausesStartIndex);
      const causesRegex = /\d+\.\s+(.*?)\s*(?=<br>\d+\.\s+|$)/g;
      const causes = [];
      let match;

  
      while ((match = causesRegex.exec(possibleCausesSection)) !== null) {
        causes.push(match[1]);
      }
      if (causes.length > 0) {
        causes[causes.length - 1] = causes[causes.length - 1].replace(/\s*<br>$/, '');
      }
  
      return causes;
    } else {
      return [];
    }
  }
  
  
  
  