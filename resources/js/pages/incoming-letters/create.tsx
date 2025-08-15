import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';



export default function CreateIncomingLetter() {
    const { data, setData, post, processing, errors } = useForm({
        registration_number: '',
        sender_name: '',
        sender_organization: '',
        subject: '',
        letter_number: '',
        recipient_name: '',
        received_date: new Date().toISOString().split('T')[0],
        status: 'received',
        department: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('incoming-letters.store'));
    };

    return (
        <AppShell>
            <Head title="Tambah Surat Masuk - E-MOT" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            ➕ Tambah Surat Masuk
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Input data surat masuk mutasi pegawai baru
                        </p>
                    </div>
                    <Link href={route('incoming-letters.index')}>
                        <Button variant="outline">
                            ← Kembali ke Daftar
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>📝 Data Surat Masuk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Registration Number */}
                                <div>
                                    <label htmlFor="registration_number" className="block text-sm font-medium mb-2">
                                        Nomor Register *
                                    </label>
                                    <Input
                                        id="registration_number"
                                        type="text"
                                        placeholder="REG-001/2024"
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
                                        placeholder="001/KEP/2024"
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
                                        placeholder="Nama lengkap pengirim"
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
                                        placeholder="Dinas/Instansi pengirim"
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
                                        placeholder="Nama lengkap penerima"
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

                                {/* Status */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium mb-2">
                                        Status Surat *
                                    </label>
                                    <select
                                        id="status"
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
                                    <label htmlFor="department" className="block text-sm font-medium mb-2">
                                        Bidang Penanganan *
                                    </label>
                                    <select
                                        id="department"
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
                            </div>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                    Perihal Surat *
                                </label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder="Perihal/subjek surat"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    required
                                />
                                <InputError message={errors.subject} className="mt-1" />
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                                    Keterangan
                                </label>
                                <textarea
                                    id="notes"
                                    rows={4}
                                    placeholder="Catatan atau keterangan tambahan..."
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                <InputError message={errors.notes} className="mt-1" />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex items-center justify-end space-x-4 pt-4">
                                <Link href={route('incoming-letters.index')}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Surat'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}