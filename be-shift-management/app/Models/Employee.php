<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shifts()
    {
        return $this->belongsToMany(Shift::class, 'employee_shift');
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function shiftRequest()
    {
        return $this->hasMany(ShiftRequest::class);
    }
}
