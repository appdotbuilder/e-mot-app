import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
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

interface WelcomeProps extends SharedData {
    letter?: Letter;
    registration_number?: string;
}

export default function Welcome() {
    const { auth, letter, registration_number } = usePage<WelcomeProps>().props;
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
            <Head title="E-MOT - Electronic Monitoring">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Electronic Monitoring</p>
                                </div>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Dashboard Admin
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Hero Section */}
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                                📋 Sistem E-MOT
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Electronic Monitoring untuk pengelolaan dan tracking pengajuan mutasi pegawai negeri sipil secara digital dan terintegrasi.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="mx-auto mt-16 max-w-5xl">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                        <span className="text-xl">🔍</span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Pelacakan Real-time
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Lacak progress berkas mutasi Anda dengan nomor registrasi kapan saja, di mana saja.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                                        <span className="text-xl">⚡</span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Proses Cepat
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Sistem digital yang mempercepat proses administrasi dan mengurangi waktu tunggu.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 dark:bg-gray-800 dark:ring-gray-700/50">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                        <span className="text-xl">📈</span>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                        Dashboard Admin
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        Panel admin lengkap untuk mengelola surat masuk, progress, dan data pegawai.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Section */}
                        <div className="mx-auto mt-20 max-w-2xl">
                            <Card className="shadow-lg">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-2xl">🔍 Lacak Berkas Anda</CardTitle>
                                    <CardDescription>
                                        Masukkan nomor registrasi untuk melihat status terkini berkas mutasi Anda
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleTrack} className="space-y-4">
                                        <div className="flex space-x-2">
                                            <Input
                                                type="text"
                                                placeholder="Masukkan nomor registrasi (contoh: REG-123/2024)"
                                                value={trackingNumber}
                                                onChange={(e) => setTrackingNumber(e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button 
                                                type="submit" 
                                                disabled={isTracking || !trackingNumber.trim()}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                {isTracking ? 'Mencari...' : 'Lacak'}
                                            </Button>
                                        </div>
                                    </form>

                                    {/* Tracking Results */}
                                    {registration_number && (
                                        <div className="mt-6 border-t pt-6">
                                            {letter ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-semibold text-green-800 dark:text-green-200">
                                                            ✅ Berkas Ditemukan
                                                        </h4>
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(letter.status)}`}>
                                                            {getStatusLabel(letter.status)}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                                                        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nomor Registrasi</dt>
                                                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">{letter.registration_number}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Pengirim</dt>
                                                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">{letter.sender_name}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Perihal</dt>
                                                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">{letter.subject}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Bidang Penanganan</dt>
                                                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">{letter.department}</dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Update Terakhir</dt>
                                                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                    {letter.last_update_date ? new Date(letter.last_update_date).toLocaleDateString('id-ID') : 'Belum ada update'}
                                                                </dd>
                                                            </div>
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status Terakhir</dt>
                                                                <dd className="text-sm font-semibold text-gray-900 dark:text-white">{getStatusLabel(letter.status)}</dd>
                                                            </div>
                                                        </dl>
                                                        
                                                        {letter.notes && (
                                                            <div className="mt-4">
                                                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Keterangan Progress</dt>
                                                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{letter.notes}</dd>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div className="text-yellow-600 dark:text-yellow-400">
                                                        <span className="text-2xl">⚠️</span>
                                                        <p className="mt-2 text-sm font-medium">
                                                            Berkas dengan nomor registrasi "{registration_number}" tidak ditemukan.
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                            Pastikan nomor registrasi sudah benar atau hubungi admin.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200/50 bg-white/50 dark:border-gray-700/50 dark:bg-gray-900/50">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                © 2024 E-MOT (Electronic Monitoring). Sistem monitoring mutasi PNS.
                            </p>
                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                Dikembangkan untuk meningkatkan efisiensi administrasi kepegawaian.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}