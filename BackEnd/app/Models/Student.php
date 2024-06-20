<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name', 'email', 'date_birth', 'contact', 'cpf', 'city', 'neighborhood', 'number', 'street', 'state', 'cep', 'file_id', 'complement', 'user_id'
   ];

  protected $hidden = ['created_at', 'updated_at'];

  public function user()
    {
       return $this->belongsTo(User::class);
    }

  public function mealPlanSchedules()
    {
        return $this->hasMany(MealPlanSchedule::class, 'student_id');
    }

    public function avaliations()
    {
        return $this->hasMany(Avaliation::class);
    }
}
