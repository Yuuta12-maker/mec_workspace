import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">MEC Workspace</h1>
      </header>
      <main className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-4">ようこそ！</h2>
        <p>ここからアプリの機能を構築していきます。</p>
        <div className="mt-4 flex gap-4">
          <Button asChild>
            <Link href="/clients">
              クライアント一覧へ
            </Link>
          </Button>
          <Button>これはボタンのサンプルです</Button>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground p-4 text-center">
        <p>&copy; 2024 MEC Workspace</p>
      </footer>
    </div>
  );
}
