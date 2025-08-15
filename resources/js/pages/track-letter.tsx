import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Letter {
    id: number;
    registration_number: string;
    sender_name: string;
    subject: string;
    status: string;
    department: string;
    last_update_date: string | null;
    notes: string | null;
}

interface TrackLetterProps {
    letter?: Letter;
    registration_number?: string;
    [key: string]: unknown;
}

export default function TrackLetter() {
    const { letter, registration_number } = usePage<TrackLetterProps>().props;
    const [trackingNumber, setTrackingNumber] = useState(registration_number || '');
    const [isTracking, setIsTracking] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;
        
        setIsTracking(true);
        router.post(route('track-letter'), 
            { registration_number: trackingNumber },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsTracking(false)
            }
        );
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
        <>
            <Head title="Lacak Berkas - E-MOT" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                                    <span className="text-lg font-bold text-white">📊</span>
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">E-MOT</h1>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Pelacakan Berkas</p>
                                </div>
                            </div>
                            <nav>
                                <a
                                    href={route('home')}
                                    className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                >
                                    ← Kembali ke Beranda
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                            🔍 Lacak Berkas Mutasi
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Masukkan nomor registrasi untuk melihat status dan progress terkini berkas mutasi pegawai Anda.
                        </p>
                    </div>

                    {/* Tracking Form */}
                    <Card className="shadow-xl mb-8">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">🎯 Form Pelacakan</CardTitle>
                            <CardDescription>
                                Gunakan nomor registrasi yang diberikan saat pengajuan berkas
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleTrack} className="space-y-4">
                                <div className="flex space-x-2">
                                    <Input
                                        type="text"
                                        placeholder="Contoh: REG-123/2024"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        className="flex-1 text-center font-mono"
                                    />
                                    <Button 
                                        type="submit" 
                                        disabled={isTracking || !trackingNumber.trim()}
                                        className="bg-blue-600 hover:bg-blue-700 px-8"
                                    >
                                        {isTracking ? '⏳ Mencari...' : '🔍 Lacak Berkas'}
                                    </Button>
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Nomor registrasi dapat ditemukan pada tanda terima berkas yang Anda ajukan
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Tracking Results */}
                    {registration_number && (
                        <div className="space-y-6">
                            {letter ? (
                                <Card className="shadow-xl">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
                                                <span className="text-2xl">✅</span>
                                                <span>Berkas Ditemukan!</span>
                                            </CardTitle>
                                            <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(letter.status)}`}>
                                                {getStatusLabel(letter.status)}
                                            </span>
                                        </div>
                                        <CardDescription className="text-base">
                                            Informasi lengkap berkas mutasi Anda
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Status Progress */}
                                        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-900/20 dark:to-indigo-900/20">
                                            <h3 className="mb-4 font-semibold text-lg">📈 Progress Berkas</h3>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Status Terakhir
                                                    </label>
                                                    <p className="mt-1 text-lg font-bold">
                                                        {getStatusLabel(letter.status)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Bidang Penanganan
                                                    </label>
                                                    <p className="mt-1 text-lg font-bold">
                                                        {letter.department}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Tanggal Update Terakhir
                                                    </label>
                                                    <p className="mt-1 text-lg font-bold">
                                                        {letter.last_update_date 
                                                            ? new Date(letter.last_update_date).toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })
                                                            : 'Belum ada update'
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Nomor Registrasi
                                                    </label>
                                                    <p className="mt-1 text-lg font-bold font-mono">
                                                        {letter.registration_number}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Letter Details */}
                                        <div className="rounded-lg border bg-gray-50 p-6 dark:bg-gray-800 dark:border-gray-700">
                                            <h3 className="mb-4 font-semibold text-lg">📄 Detail Berkas</h3>
                                            <div className="grid gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Nama Pemohon
                                                    </label>
                                                    <p className="mt-1 text-base font-semibold">
                                                        {letter.sender_name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                        Perihal Permohonan
                                                    </label>
                                                    <p className="mt-1 text-base">
                                                        {letter.subject}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Notes */}
                                        {letter.notes && (
                                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:bg-blue-900/20 dark:border-blue-800">
                                                <h3 className="mb-2 font-semibold text-lg text-blue-800 dark:text-blue-200">
                                                    💬 Keterangan Progress
                                                </h3>
                                                <p className="text-blue-700 dark:text-blue-300 whitespace-pre-wrap">
                                                    {letter.notes}
                                                </p>
                                            </div>
                                        )}

                                        {/* Next Steps */}
                                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:bg-amber-900/20 dark:border-amber-800">
                                            <h3 className="mb-2 font-semibold text-lg text-amber-800 dark:text-amber-200">
                                                💡 Informasi Penting
                                            </h3>
                                            <div className="text-amber-700 dark:text-amber-300">
                                                {letter.status === 'completed' ? (
                                                    <p>✅ Proses mutasi Anda telah selesai. Silakan hubungi bagian kepegawaian untuk informasi lebih lanjut.</p>
                                                ) : letter.status === 'rejected' ? (
                                                    <p>❌ Permohonan mutasi tidak dapat diproses. Silakan hubungi bagian kepegawaian untuk klarifikasi.</p>
                                                ) : letter.status === 'approved' ? (
                                                    <p>✅ Permohonan mutasi Anda telah disetujui. Proses administrasi selanjutnya sedang berlangsung.</p>
                                                ) : (
                                                    <p>⏳ Berkas Anda sedang dalam proses. Pantau terus status ini untuk informasi terbaru.</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Card className="shadow-xl">
                                    <CardContent className="py-12">
                                        <div className="text-center space-y-4">
                                            <div className="text-6xl">❓</div>
                                            <h3 className="text-xl font-semibold text-yellow-700 dark:text-yellow-300">
                                                Berkas Tidak Ditemukan
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                                Berkas dengan nomor registrasi <strong>"{registration_number}"</strong> tidak ditemukan dalam sistem.
                                            </p>
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mt-6">
                                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                                                    Kemungkinan Penyebab:
                                                </h4>
                                                <ul className="text-sm text-yellow-700 dark:text-yellow-300 text-left space-y-1">
                                                    <li>• Nomor registrasi salah atau typo</li>
                                                    <li>• Berkas belum diinput ke sistem</li>
                                                    <li>• Format nomor tidak sesuai (contoh: REG-123/2024)</li>
                                                    <li>• Berkas sudah terlalu lama dan diarsipkan</li>
                                                </ul>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Jika yakin nomor registrasi benar, silakan hubungi bagian kepegawaian untuk bantuan lebih lanjut.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Help Section */}
                    <Card className="mt-12">
                        <CardHeader>
                            <CardTitle>❓ Butuh Bantuan?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="font-semibold mb-2">📞 Kontak Bantuan</h4>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        Bagian Kepegawaian
                                    </p>
                                    <p className="text-sm">Telp: (021) 1234-5678</p>
                                    <p className="text-sm">Email: kepegawaian@instansi.go.id</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">⏰ Jam Layanan</h4>
                                    <p className="text-sm">Senin - Jumat: 08:00 - 16:00 WIB</p>
                                    <p className="text-sm text-muted-foreground">
                                        (Kecuali hari libur nasional)
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </>
    );
}