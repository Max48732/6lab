"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { createPost } from "./actions";

const postSchema = yup.object({
  title: yup.string().min(3, "Минимум 3 символа").required("Обязательное поле"),
  body: yup.string().min(10, "Минимум 10 символов").required("Обязательное поле"),
}).required();

type PostFormData = yup.InferType<typeof postSchema>;

export default function CreatePostForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data: PostFormData) => {
    const formData = new FormData();
    formData.set("title", data.title);
    formData.set("body", data.body);

    // Вызываем Server Action — внутри него revalidatePath("/posts")
    await createPost(formData);
  };

  const inputClass =
    "border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md space-y-5"
    >
      <h1 className="text-2xl font-bold text-gray-800">Создать пост</h1>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Заголовок</label>
        <input
          {...register("title")}
          placeholder="Заголовок поста"
          className={inputClass}
        />
        {errors.title && (
          <p role="alert" className="text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Содержание</label>
        <textarea
          {...register("body")}
          placeholder="Текст поста..."
          rows={5}
          className={inputClass + " resize-none"}
        />
        {errors.body && (
          <p role="alert" className="text-sm text-red-500">
            {errors.body.message}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Назад
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isSubmitting ? "Отправка..." : "Опубликовать"}
        </button>
      </div>
    </form>
  );
}
