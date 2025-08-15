import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Letter {
    id: number;
    registration_number: string;
    sender_name: string;
    sender_organization: string;
    subject: string;
    letter_number: string;
    recipient_name: string;
    received_date: string;
    status: string;
    department: string;
    last_update_date: string | null;
    notes: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedLetters {
    data: Letter[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface PageProps {
    letters: PaginatedLetters;
    filters: {
        search?: string;
        status?: string;
        department?: string;
    };
    [key: string]: unknown;
}

export default function IncomingLettersIndex() {
    const { letters, filters } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [departmentFilter] = useState(filters.department || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('incoming-letters.index'), {
            search: searchTerm,
            status: statusFilter,
            department: departmentFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (letter: Letter) => {
        if (confirm(`Apakah Anda yakin ingin menghapus surat "${letter.registration_number}"?`)) {
            router.delete(route('incoming-letters.destroy', letter.id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'received': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'in_process': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'reviewed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'received': return 'Diterima';
            case 'in_process': return 'Dalam Proses';
            case 'reviewed': return 'Sedang Ditinjau';
            case 'approved': return 'Disetujui';
            case 'rejected': return 'Ditolak';
            case 'completed': return 'Selesai';
            default: return status;
        }
    };

    return (
        <AppShell>
            <Head title="Kelola Surat Masuk - E-MOT" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            📋 Kelola Surat Masuk
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Kelola dan pantau semua surat masuk mutasi pegawai
                        </p>
                    </div>
                    <Link href={route('incoming-letters.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Tambah Surat Baru
                        </Button>
                    </Link>
                </div>

                {/* Search and Filter */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">🔍 Pencarian & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-4">
                                <div className="md:col-span-2">
                                    <Input
                                        type="text"
                                        placeholder="Cari berdasarkan nama pengirim, penerima, atau nomor..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="">Semua Status</option>
                                        <option value="received">Diterima</option>
                                        <option value="in_process">Dalam Proses</option>
                                        <option value="reviewed">Sedang Ditinjau</option>
                                        <option value="approved">Disetujui</option>
                                        <option value="rejected">Ditolak</option>
                                        <option value="completed">Selesai</option>
                                    </select>
                                </div>
                                <div>
                                    <Button type="submit" className="w-full">
                                        Cari
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Results Summary */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {letters.data.length} dari {letters.total} surat
                        {(searchTerm || statusFilter) && ' (hasil pencarian)'}
                    </p>
                    {(searchTerm || statusFilter) && (
                        <Link href={route('incoming-letters.index')}>
                            <Button variant="outline" size="sm">
                                Reset Filter
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Letters Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left text-sm font-medium text-muted-foreground">
                                        <th className="p-4">Nomor Register</th>
                                        <th className="p-4">Pengirim</th>
                                        <th className="p-4">Penerima</th>
                                        <th className="p-4">Perihal</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Bidang</th>
                                        <th className="p-4">Tanggal</th>
                                        <th className="p-4">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {letters.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="p-8 text-center text-muted-foreground">
                                                {(searchTerm || statusFilter) ? 'Tidak ada surat yang sesuai dengan pencarian.' : 'Belum ada surat masuk.'}
                                            </td>
                                        </tr>
                                    ) : (
                                        letters.data.map((letter) => (
                                            <tr key={letter.id} className="border-b text-sm">
                                                <td className="p-4">
                                                    <div className="font-medium">{letter.registration_number}</div>
                                                    <div className="text-xs text-muted-foreground">{letter.letter_number}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-medium">{letter.sender_name}</div>
                                                    <div className="text-xs text-muted-foreground">{letter.sender_organization}</div>
                                                </td>
                                                <td className="p-4 font-medium">{letter.recipient_name}</td>
                                                <td className="p-4">
                                                    <div className="max-w-xs truncate" title={letter.subject}>
                                                        {letter.subject}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(letter.status)}`}>
                                                        {getStatusLabel(letter.status)}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm">{letter.department}</td>
                                                <td className="p-4 text-sm">
                                                    {new Date(letter.received_date).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex space-x-2">
                                                        <Link href={route('incoming-letters.show', letter.id)}>
                                                            <Button variant="outline" size="sm">
                                                                👁️
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('incoming-letters.edit', letter.id)}>
                                                            <Button variant="outline" size="sm">
                                                                ✏️
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDelete(letter)}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            🗑️
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {letters.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {letters.links.map((link, index) => (
                            <React.Fragment key={index}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 border hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        className="px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}