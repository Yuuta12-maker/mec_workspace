import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const clientsFilePath = path.join(process.cwd(), 'data', 'clients.json');

export async function GET() {
  try {
    const data = await fs.readFile(clientsFilePath, 'utf-8');
    const clients = JSON.parse(data);
    return NextResponse.json(clients);
  } catch (error) {
    console.error('Error reading clients data:', error);
    return NextResponse.json({ message: 'Error reading clients data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newClient = await request.json();
    const data = await fs.readFile(clientsFilePath, 'utf-8');
    const clients = JSON.parse(data);

    // Assign a simple ID (for now)
    newClient.id = Date.now().toString();

    clients.push(newClient);
    await fs.writeFile(clientsFilePath, JSON.stringify(clients, null, 2));
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    console.error('Error adding new client:', error);
    return NextResponse.json({ message: 'Error adding new client' }, { status: 500 });
  }
}
