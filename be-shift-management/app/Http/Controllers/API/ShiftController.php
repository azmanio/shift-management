<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');

        $this->middleware('IsManager')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shifts = Shift::with(['employees', 'attendances'])->get();
        return response()->json($shifts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shift_name' => 'required|string|max:255',
            'shift_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'employee_id' => 'required|exists:employees,id',
        ]);

        try {
            $shift = Shift::create($validated);
            return response()->json($shift, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal menambahkan shift'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shift = Shift::with(['employee', 'attendances'])->findOrFail($id);
        return response()->json($shift);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'shift_name' => 'required|string|max:255',
            'shift_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'employee_id' => 'required|exists:employees,id',
        ]);

        try {
            $shift = Shift::findOrFail($id);
            $shift->update($validated);

            return response()->json($shift);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Gagal memperbarui shift: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $shift = Shift::findOrFail($id);
        $shift->delete();

        return response()->json(['message' => 'Shift deleted successfully']);
    }
}