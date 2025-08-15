import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
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
    created_at: string;
    updated_at: string;
}

interface PageProps {
    letter: Letter;
    [key: string]: unknown;
}

export default function ShowIncomingLetter() {
    const { letter } = usePage<PageProps>().props;

    const handleDelete = () => {
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
            <Head title={`Detail Surat ${letter.registration_number} - E-MOT`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            📋 Detail Surat Masuk
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {letter.registration_number} • {letter.subject}
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={route('incoming-letters.index')}>
                            <Button variant="outline">
                                ← Kembali
                            </Button>
                        </Link>
                        <Link href={route('incoming-letters.edit', letter.id)}>
                            <Button variant="outline">
                                ✏️ Edit
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-700"
                        >
                            🗑️ Hapus
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>📝 Informasi Surat</span>
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(letter.status)}`}>
                                        {getStatusLabel(letter.status)}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Nomor Register
                                        </label>
                                        <p className="mt-1 text-sm font-semibold">
                                            {letter.registration_number}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Nomor Surat
                                        </label>
                                        <p className="mt-1 text-sm font-semibold">
                                            {letter.letter_number}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Tanggal Surat Masuk
                                        </label>
                                        <p className="mt-1 text-sm font-semibold">
                                            {new Date(letter.received_date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Bidang Penanganan
                                        </label>
                                        <p className="mt-1 text-sm font-semibold">
                                            {letter.department}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Perihal Surat
                                    </label>
                                    <p className="mt-1 text-sm font-semibold">
                                        {letter.subject}
                                    </p>
                                </div>

                                {letter.notes && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Keterangan
                                        </label>
                                        <p className="mt-1 text-sm whitespace-pre-wrap">
                                            {letter.notes}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>👥 Informasi Pengirim & Penerima</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <h4 className="font-medium">📤 Pengirim</h4>
                                        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                                            <p className="font-semibold">{letter.sender_name}</p>
                                            <p className="text-sm text-muted-foreground">{letter.sender_organization}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium">📥 Penerima</h4>
                                        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                                            <p className="font-semibold">{letter.recipient_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>⚡ Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={route('incoming-letters.edit', letter.id)}>
                                    <Button className="w-full justify-start" variant="outline">
                                        ✏️ Edit Data Surat
                                    </Button>
                                </Link>
                                <Link href={route('incoming-letters.edit', letter.id)}>
                                    <Button className="w-full justify-start" variant="outline">
                                        📈 Update Progress
                                    </Button>
                                </Link>
                                <Link href={route('track-letter', { registration_number: letter.registration_number })}>
                                    <Button className="w-full justify-start" variant="outline">
                                        🔍 Lihat Pelacakan Publik
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Status Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                            ✓
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Surat Diterima</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(letter.received_date).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>

                                    {letter.last_update_date && (
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                📈
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">Progress Terakhir</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(letter.last_update_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="border-l-2 border-dashed border-gray-200 ml-4 pl-7 pb-2">
                                        <p className="text-xs text-muted-foreground">
                                            Status saat ini: <span className="font-medium">{getStatusLabel(letter.status)}</span>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>ℹ️ Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <label className="font-medium text-gray-500 dark:text-gray-400">
                                        Dibuat pada
                                    </label>
                                    <p>{new Date(letter.created_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <label className="font-medium text-gray-500 dark:text-gray-400">
                                        Terakhir diperbarui
                                    </label>
                                    <p>{new Date(letter.updated_at).toLocaleString('id-ID')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}