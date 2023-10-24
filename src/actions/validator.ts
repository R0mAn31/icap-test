import * as yup from "yup";

export const validationSchema: { [key: string]: any } = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    birthday_date: yup.string()
    .matches(/^\d{2}-\d{2}-\d{2}$/, 'Date must be in the format 24-10-23')
    .required('Address is required'),
    phone_number: yup.string().required("Phone Number is required"),
    address: yup.string().required("Address is required"),
});

export const changeDateFormat = (data: string) => {
  const parts = data.split('-');
  
  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    
    const fullYear = (parseInt(year) < 50) ? '20' + year : '19' + year;
    
    const formattedDate = `${fullYear}-${month}-${day}`;
    
    return formattedDate;
  } else {
    return "Invalid Date";
  }
}