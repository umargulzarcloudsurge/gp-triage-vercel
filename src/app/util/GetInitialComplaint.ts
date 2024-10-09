export const getInitialComplaint = (data: any): string | null  => {
    const symptomSummary: string = data?.gp_triagesummary;
    const initialComplaintMatch: RegExpMatchArray | null = symptomSummary?.match(/Initial complaint:\s*([^<]*)/);
    const initialComplaint: string | null = initialComplaintMatch ? initialComplaintMatch[1]?.trim() : null;
    return initialComplaint;
}