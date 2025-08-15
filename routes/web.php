<?php

use App\Http\Controllers\IncomingLetterController;
use App\Http\Controllers\TrackController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/track', [TrackController::class, 'index'])->name('track-letter');
Route::post('/track', [TrackController::class, 'store']);

// Protected routes (Admin only)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Incoming Letters management
    Route::resource('incoming-letters', IncomingLetterController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
