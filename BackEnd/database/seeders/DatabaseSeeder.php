<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        try {
            DB::beginTransaction();

            Profile::create(['id' => 1, 'name' => 'ADMIN']);
            Profile::create(['id' => 2, 'name' => 'RECEPCIONISTA']);
            Profile::create(['id' => 3, 'name' => 'INSTRUTOR']);
            Profile::create(['id' => 4, 'name' => 'NUTRICIONISTA']);
            Profile::create(['id' => 5, 'name' => 'ALUNO']);

            $defaultEmail = env("DEFAULT_EMAIL");
            if (!$defaultEmail) {
                throw new \Exception('O valor do email padrão não está definido no arquivo .env');
            }

            User::create([
                'name' => 'ADMIN',
                'email' => $defaultEmail,
                'password' => env("DEFAULT_PASSWORD"),
                'profile_id' => 1
            ]);

            User::create([
                'name' => 'Maria da recepção',
                'email' => "maria_recepcao@gmail.com",
                'password' => "12345678",
                'profile_id' => 2
            ]);

            User::create([
                'name' => 'Paulo Instrutor',
                'email' => "paulo_whey@gmail.com",
                'password' => "12345678",
                'profile_id' => 3
            ]);

            User::create([
                'name' => 'Juliana Carb',
                'email' => "pastel_e_coxinha@gmail.com",
                'password' => "12345678",
                'profile_id' => 4
            ]);

            User::create([
                'name' => 'Henrique Douglas',
                'email' => "henrique@gmail.com",
                'password' => "12345678",
                'profile_id' => 5
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erro ao popular o banco de dados: ' . $e->getMessage());
        }
    }
}