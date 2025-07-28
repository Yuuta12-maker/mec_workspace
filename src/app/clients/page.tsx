"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "名前は2文字以上で入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  phone: z.string().optional(),
});

async function getClients(): Promise<Client[]> {
  const res = await fetch('/api/clients', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch clients');
  }
  return res.json();
}

function NewClientForm({ onClientAdded }: { onClientAdded: () => void }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Failed to add client');
      }

      form.reset();
      setOpen(false);
      onClientAdded(); // 親コンポーネントにクライアントが追加されたことを通知
      router.refresh(); // ページをリフレッシュして最新のクライアントリストを表示
    } catch (error) {
      console.error('Error adding client:', error);
      alert('クライアントの追加に失敗しました。');
    }
  }

  return (
    <Button onClick={() => setOpen(true)}>新規クライアント追加 (テスト)</Button>
  );
}

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">クライアント一覧</h1>
        <NewClientForm onClientAdded={() => { /* TODO: Refresh client list */ }} />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>電話番号</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}