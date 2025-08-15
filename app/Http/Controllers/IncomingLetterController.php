<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIncomingLetterRequest;
use App\Http\Requests\UpdateIncomingLetterRequest;
use App\Http\Requests\UpdateLetterProgressRequest;
use App\Models\IncomingLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomingLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = IncomingLetter::query();
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('sender_name', 'like', "%{$search}%")
                  ->orWhere('recipient_name', 'like', "%{$search}%")
                  ->orWhere('registration_number', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        // Filter by department
        if ($request->filled('department')) {
            $query->where('department', $request->input('department'));
        }

        $letters = $query->latest('received_date')->paginate(15);
        
        return Inertia::render('incoming-letters/index', [
            'letters' => $letters,
            'filters' => $request->only(['search', 'status', 'department'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('incoming-letters/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIncomingLetterRequest $request)
    {
        IncomingLetter::create($request->validated());

        return redirect()->route('incoming-letters.index')
            ->with('success', 'Surat masuk berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(IncomingLetter $incomingLetter)
    {
        return Inertia::render('incoming-letters/show', [
            'letter' => $incomingLetter
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IncomingLetter $incomingLetter)
    {
        return Inertia::render('incoming-letters/edit', [
            'letter' => $incomingLetter
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateIncomingLetterRequest $request, IncomingLetter $incomingLetter)
    {
        $incomingLetter->update($request->validated());

        return redirect()->route('incoming-letters.show', $incomingLetter)
            ->with('success', 'Data surat berhasil diperbarui.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IncomingLetter $incomingLetter)
    {
        $incomingLetter->delete();

        return redirect()->route('incoming-letters.index')
            ->with('success', 'Surat berhasil dihapus.');
    }


}