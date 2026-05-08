import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold">Lab 6 – Validation</h1>
      <Link
        href="/register"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Регистрация
      </Link>
    </div>
  );
}
