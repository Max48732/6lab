// Ревалидация: страница не кешируется, дата всегда свежая
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";

const PostsPage = () => {
  // Дата считается на сервере при каждом запросе
  const date = new Date().toISOString();

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Посты</h1>

      <div className="bg-gray-50 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 mb-1">Текущее время (обновляется при каждом посещении):</p>
        <span className="font-mono text-sm text-gray-700">{date}</span>
      </div>

      <Link
        href="/posts/create"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Create Post
      </Link>
    </div>
  );
};

export default PostsPage;
