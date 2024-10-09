export const calculateAge = (birthDate: string): number =>{
    const birthDateObj = new Date(birthDate);
    const otherDate = new Date();

    let years = otherDate.getFullYear() - birthDateObj.getFullYear();

    if (otherDate.getMonth() < birthDateObj.getMonth() ||
        (otherDate.getMonth() === birthDateObj.getMonth() &&
            otherDate.getDate() < birthDateObj.getDate())) {
        years--;
    }

    return years;
}

