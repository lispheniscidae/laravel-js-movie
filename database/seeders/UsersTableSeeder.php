<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => '[YOUR NAME]',
            'email' => '[SOME EMAIL]',
            'password' => Hash::make('[SOME_PASSWORD]')
          ]);
    }
}
