<?php

namespace App\Interfaces;

interface ExerciseRepositoryInterface {
    public function createExercise($userId, $description);
    public function findExerciseByUserIdAndDescription($userId, $description);
    public function findOne($id);
    public function deleteOne($id);
}
