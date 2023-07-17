import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validateRequired = (label: string) =>
  yup.string().nullable().required(`Vui lòng nhập ${label}`);

export const validateRequiredMsg = (label: string) =>
  yup.string().nullable().required(`${label}`);

export const validateNumber = (msg = "") =>
  yup
    .string()
    .required(msg)
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number minium 10 characters")
    .max(10, "Phone number up to 11 characters");

export const validatePhone = () =>
  yup
    .string()
    .max(15, "SĐT tối đa 15 ký tự")
    .min(10, "SĐT tối thiểu 10 ký tự")
    .matches(/^(84|0[3|5|7|8|9])[0-9]{8,13}$/, {
      message: "Số điện thoại chưa đúng định dạng",
      excludeEmptyString: true,
    });

export const validateEmail = () =>
  yup
    .string()
    .required("Vui lòng nhập email")
    .max(60, "Email tối đa 60 ký tự")
    .email("Email không đúng định dạng");

export const schemaCreateOrder = yup.object({
  name: validateRequired("tên liên hệ"),
  email: validateEmail(),
  phone: validatePhone(),
});
