import * as yup from "yup";

export const registerSchema = yup.object({
  user_name: yup
    .string()
    .min(3, "Минимум 3 символа")
    .required("Обязательное поле"),
  email: yup
    .string()
    .email("Некорректный email")
    .required("Обязательное поле"),
  age: yup
    .number()
    .typeError("Введите число")
    .positive("Возраст должен быть положительным")
    .integer("Возраст должен быть целым числом")
    .min(1, "Минимум 1")
    .max(120, "Максимум 120")
    .required("Обязательное поле"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Обязательное поле"),
}).required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;
