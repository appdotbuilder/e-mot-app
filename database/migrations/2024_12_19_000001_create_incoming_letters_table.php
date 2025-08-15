<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('incoming_letters', function (Blueprint $table) {
            $table->id();
            $table->string('registration_number')->unique()->comment('Nomor Register');
            $table->string('sender_name')->comment('Nama Pengirim');
            $table->string('sender_organization')->comment('Nama OPD');
            $table->string('subject')->comment('Perihal Surat');
            $table->string('letter_number')->comment('Nomor Surat');
            $table->string('recipient_name')->comment('Nama Penerima');
            $table->date('received_date')->comment('Tanggal Surat Masuk');
            $table->enum('status', [
                'received',
                'in_process', 
                'reviewed',
                'approved',
                'rejected',
                'completed'
            ])->default('received')->comment('Status Surat');
            $table->string('department')->comment('Bidang');
            $table->date('last_update_date')->nullable()->comment('Tanggal Update Terakhir');
            $table->text('notes')->nullable()->comment('Keterangan');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('registration_number');
            $table->index('sender_name');
            $table->index('recipient_name');
            $table->index('status');
            $table->index(['status', 'department']);
            $table->index('received_date');
            $table->index('last_update_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('incoming_letters');
    }
};