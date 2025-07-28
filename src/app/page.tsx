import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Link href="/clients" className="text-blue-500 hover:underline text-xl">
        クライアント一覧へ
      </Link>
    </div>
  );
}
