<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producer;
use Faker\Factory as faker;
class ProducerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach(range(1,10) as $index){
            Producer::create([
                'name' => $faker->name(),
                'email' => $faker->safeEmail(),
                ]);

            
        }
    }
}
