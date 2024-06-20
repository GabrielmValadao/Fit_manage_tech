<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExerciseFactory extends Factory
{
    protected $model = Exercise::class;


    public function definition(): array
    {

        return [
            'user_id' => User::factory(),
            'description' => fake()->sentence(),
        ];
    }
}
