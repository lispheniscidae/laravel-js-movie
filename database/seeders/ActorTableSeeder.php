<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Actor;
use Faker\Factory as faker;

class ActorTableSeeder extends Seeder
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
            Actor::create([
                'fname' => $faker->firstName($gender = 'others'|'male'|'female'),
                'lname' => $faker->lastName(),
                'note' => $faker->sentence($nbWords = 6, $variableNbWords = true)
                
                ]);

            
        }
    }
}
