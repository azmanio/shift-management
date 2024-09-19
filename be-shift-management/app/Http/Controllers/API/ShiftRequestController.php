<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ShiftRequest;
use Illuminate\Http\Request;

class ShiftRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');

        $this->middleware('IsManager')->except(['index', 'show', 'store']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = ShiftRequest::with(['employee', 'shift'])->get();
        return response()->json($requests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'shift_id' => 'required|exists:shifts,id',
            'employee_id' => 'required|exists:employees,id',
            'requested_shift_id' => 'required|exists:shifts,id',
            'status' => 'required|string|max:255',
        ]);

        $shiftRequest = ShiftRequest::create([
            'shift_id' => $request->shift_id,
            'employee_id' => $request->employee_id,
            'requested_shift_id' => $request->requested_shift_id,
            'status' => $request->status,
        ]);

        return response()->json($shiftRequest, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shiftRequest = ShiftRequest::with(['employee', 'shift'])->findOrFail($id);
        return response()->json($shiftRequest);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $shiftRequest = ShiftRequest::findOrFail($id);
        $shiftRequest->update($request->all());

        return response()->json($shiftRequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $shiftRequest = ShiftRequest::findOrFail($id);
        $shiftRequest->delete();

        return response()->json(['message' => 'Shift request deleted successfully']);
    }
}
