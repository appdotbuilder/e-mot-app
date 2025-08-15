<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\IncomingLetter;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin E-MOT',
            'email' => 'admin@emot.go.id',
        ]);

        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample incoming letters
        IncomingLetter::factory(25)->create();
    }
}
