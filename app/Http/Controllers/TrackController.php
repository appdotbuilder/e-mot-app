<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\IncomingLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackController extends Controller
{
    /**
     * Show the tracking form.
     */
    public function index()
    {
        return Inertia::render('track-letter');
    }

    /**
     * Track letter by registration number.
     */
    public function store(Request $request)
    {
        $registrationNumber = $request->input('registration_number');
        $letter = null;

        if ($registrationNumber) {
            $letter = IncomingLetter::where('registration_number', $registrationNumber)->first();
        }

        return Inertia::render('track-letter', [
            'letter' => $letter,
            'registration_number' => $registrationNumber
        ]);
    }
}