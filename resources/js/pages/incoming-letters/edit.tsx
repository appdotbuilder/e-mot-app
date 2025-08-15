import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';

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



interface PageProps {
    letter: Letter;
    [key: string]: unknown;
}

export default function EditIncomingLetter() {
    const { letter } = usePage<PageProps>().props;
    
    const { data, setData, patch, processing, errors } = useForm({
        registration_number: letter.registration_number,
        sender_name: letter.sender_name,
        sender_organization: letter.sender_organization,
        subject: letter.subject,
        letter_number: letter.letter_number,
        recipient_name: letter.recipient_name,
        received_date: letter.received_date,
        status: letter.status,
        department: letter.department,
        last_update_date: letter.last_update_date || new Date().toISOString().split('T')[0],
        notes: letter.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('incoming-letters.update', letter.id));
    };

    const handleProgressUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('incoming-letters.update', letter.id));
    };

    return (
        <AppShell>
            <Head title={`Edit Surat ${letter.registration_number} - E-MOT`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            ✏️ Edit Surat Masuk
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            {letter.registration_number} • Update data dan progress surat
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href={route('incoming-letters.show', letter.id)}>
                            <Button variant="outline">
                                👁️ Lihat Detail
                            </Button>
                        </Link>
                        <Link href={route('incoming-letters.index')}>
                            <Button variant="outline">
                                ← Kembali ke Daftar
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Full Edit Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📝 Edit Data Lengkap</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Registration Number */}
                                <div>
                                    <label htmlFor="registration_number" className="block text-sm font-medium mb-2">
                                        Nomor Register *
                                    </label>
                                    <Input
                                        id="registration_number"
                                        type="text"
                                        value={data.registration_number}
                                        onChange={(e) => setData('registration_number', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.registration_number} className="mt-1" />
                                </div>

                                {/* Letter Number */}
                                <div>
                                    <label htmlFor="letter_number" className="block text-sm font-medium mb-2">
                                        Nomor Surat *
                                    </label>
                                    <Input
                                        id="letter_number"
                                        type="text"
                                        value={data.letter_number}
                                        onChange={(e) => setData('letter_number', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.letter_number} className="mt-1" />
                                </div>

                                {/* Sender Name */}
                                <div>
                                    <label htmlFor="sender_name" className="block text-sm font-medium mb-2">
                                        Nama Pengirim *
                                    </label>
                                    <Input
                                        id="sender_name"
                                        type="text"
                                        value={data.sender_name}
                                        onChange={(e) => setData('sender_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.sender_name} className="mt-1" />
                                </div>

                                {/* Sender Organization */}
                                <div>
                                    <label htmlFor="sender_organization" className="block text-sm font-medium mb-2">
                                        Nama OPD Pengirim *
                                    </label>
                                    <Input
                                        id="sender_organization"
                                        type="text"
                                        value={data.sender_organization}
                                        onChange={(e) => setData('sender_organization', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.sender_organization} className="mt-1" />
                                </div>

                                {/* Recipient Name */}
                                <div>
                                    <label htmlFor="recipient_name" className="block text-sm font-medium mb-2">
                                        Nama Penerima *
                                    </label>
                                    <Input
                                        id="recipient_name"
                                        type="text"
                                        value={data.recipient_name}
                                        onChange={(e) => setData('recipient_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.recipient_name} className="mt-1" />
                                </div>

                                {/* Received Date */}
                                <div>
                                    <label htmlFor="received_date" className="block text-sm font-medium mb-2">
                                        Tanggal Surat Masuk *
                                    </label>
                                    <Input
                                        id="received_date"
                                        type="date"
                                        value={data.received_date}
                                        onChange={(e) => setData('received_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.received_date} className="mt-1" />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Perihal Surat *
                                    </label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.subject} className="mt-1" />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan Data'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Quick Progress Update */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📈 Update Progress Cepat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProgressUpdate} className="space-y-4">
                                {/* Status */}
                                <div>
                                    <label htmlFor="status_quick" className="block text-sm font-medium mb-2">
                                        Status Surat *
                                    </label>
                                    <select
                                        id="status_quick"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        required
                                    >
                                        <option value="received">Diterima</option>
                                        <option value="in_process">Dalam Proses</option>
                                        <option value="reviewed">Sedang Ditinjau</option>
                                        <option value="approved">Disetujui</option>
                                        <option value="rejected">Ditolak</option>
                                        <option value="completed">Selesai</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-1" />
                                </div>

                                {/* Department */}
                                <div>
                                    <label htmlFor="department_quick" className="block text-sm font-medium mb-2">
                                        Bidang Penanganan *
                                    </label>
                                    <select
                                        id="department_quick"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        required
                                    >
                                        <option value="">Pilih Bidang</option>
                                        <option value="Bagian Kepegawaian">Bagian Kepegawaian</option>
                                        <option value="Bagian Umum">Bagian Umum</option>
                                        <option value="Bidang Pemerintahan">Bidang Pemerintahan</option>
                                        <option value="Bidang Kesehatan">Bidang Kesehatan</option>
                                        <option value="Bidang Pendidikan">Bidang Pendidikan</option>
                                        <option value="Bidang Pembangunan">Bidang Pembangunan</option>
                                    </select>
                                    <InputError message={errors.department} className="mt-1" />
                                </div>

                                {/* Last Update Date */}
                                <div>
                                    <label htmlFor="last_update_date" className="block text-sm font-medium mb-2">
                                        Tanggal Update *
                                    </label>
                                    <Input
                                        id="last_update_date"
                                        type="date"
                                        value={data.last_update_date}
                                        onChange={(e) => setData('last_update_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.last_update_date} className="mt-1" />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label htmlFor="notes_quick" className="block text-sm font-medium mb-2">
                                        Keterangan Progress
                                    </label>
                                    <textarea
                                        id="notes_quick"
                                        rows={4}
                                        placeholder="Keterangan update progress..."
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    />
                                    <InputError message={errors.notes} className="mt-1" />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-green-600 hover:bg-green-700"
                                    >
                                        {processing ? 'Mengupdate...' : 'Update Progress'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}