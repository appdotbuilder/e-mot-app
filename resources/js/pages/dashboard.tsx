import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard Admin - E-MOT" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        📊 Dashboard Admin E-MOT
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Kelola surat masuk dan pantau progress mutasi pegawai negeri sipil
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Surat</CardTitle>
                            <span className="text-2xl">📧</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">
                                Surat masuk keseluruhan
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Dalam Proses</CardTitle>
                            <span className="text-2xl">⏳</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">
                                Sedang dalam penanganan
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
                            <span className="text-2xl">✅</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">
                                Proses telah selesai
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
                            <span className="text-2xl">📈</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">-</div>
                            <p className="text-xs text-muted-foreground">
                                Surat masuk bulan ini
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Actions */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>📝</span>
                                <span>Kelola Surat Masuk</span>
                            </CardTitle>
                            <CardDescription>
                                Input data surat baru, edit progress, dan kelola status surat masuk
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Link href={route('incoming-letters.create')}>
                                    <Button className="w-full justify-start" variant="default">
                                        ➕ Tambah Surat Baru
                                    </Button>
                                </Link>
                                <Link href={route('incoming-letters.index')}>
                                    <Button className="w-full justify-start" variant="outline">
                                        📋 Lihat Semua Surat
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>🔍</span>
                                <span>Pencarian & Pelacakan</span>
                            </CardTitle>
                            <CardDescription>
                                Cari surat berdasarkan nama pengirim/penerima dan lacak progress
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Link href={route('incoming-letters.index', { search: '' })}>
                                    <Button className="w-full justify-start" variant="outline">
                                        🔍 Pencarian Lanjutan
                                    </Button>
                                </Link>
                                <Link href={route('track-letter')}>
                                    <Button className="w-full justify-start" variant="outline">
                                        📍 Lacak Berkas
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Tips */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>💡</span>
                            <span>Tips Penggunaan</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="font-semibold">Mengelola Surat Masuk:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Input data lengkap surat masuk baru</li>
                                    <li>• Update progress dan status secara berkala</li>
                                    <li>• Tambahkan keterangan untuk setiap perubahan</li>
                                </ul>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold">Pencarian & Pelacakan:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Gunakan nama pengirim atau penerima untuk pencarian</li>
                                    <li>• Filter berdasarkan status atau bidang</li>
                                    <li>• Nomor registrasi untuk pelacakan spesifik</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}