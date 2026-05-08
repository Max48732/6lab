"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { registerSchema, type RegisterFormData } from "@/lib/schemas";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (_data: RegisterFormData) => {
    // После успешной валидации — редирект на /posts
    router.push("/posts");
  };

  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md space-y-5"
    >
      <h1 className="text-2xl font-bold text-gray-800">Регистрация</h1>

      <Field label="Имя пользователя" error={errors.user_name?.message}>
        <input
          {...register("user_name")}
          placeholder="username"
          className={inputClass}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="user@example.com"
          className={inputClass}
        />
      </Field>

      <Field label="Возраст" error={errors.age?.message}>
        <input
          {...register("age")}
          type="number"
          placeholder="18"
          className={inputClass}
        />
      </Field>

      <Field label="Пароль" error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••"
          className={inputClass}
        />
      </Field>

      <Field label="Подтвердите пароль" error={errors.confirm_password?.message}>
        <input
          {...register("confirm_password")}
          type="password"
          placeholder="••••••"
          className={inputClass}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? "Загрузка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}
