'use client';

import { useEffect, useState } from 'react';
import { getStores } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone } from "lucide-react";

export default function StoresPage() {
    const [stores, setStores] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStores = async () => {
            const result = await getStores();
            if (result.success) {
                setStores(result.data || []);
            }
            setIsLoading(false);
        };
        fetchStores();
    }, []);

    if (isLoading) {
        return <div>Loading stores...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Stores Management</h1>
                <p className="text-muted-foreground">Oversee all registered stores and their details.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Stores</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Store Name</TableHead>
                                <TableHead>Merchant</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Menus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stores.map((store) => (
                                <TableRow key={store.id}>
                                    <TableCell>
                                        <div className="font-medium">{store.store_name}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Phone className="h-3 w-3" /> {store.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{store.merchant.full_name || store.merchant.username}</div>
                                        <div className="text-xs text-muted-foreground">{store.merchant.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{store.category}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-start gap-1 text-sm max-w-[200px] truncate">
                                            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                                            <span title={store.address}>{store.city}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={store.is_active ? 'default' : 'destructive'}>
                                            {store.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {store._count.menus} Items
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
