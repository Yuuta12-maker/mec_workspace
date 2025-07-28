import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

async function getClients(): Promise<Client[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch clients');
  }
  return res.json();
}

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">クライアント一覧</h1>
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
