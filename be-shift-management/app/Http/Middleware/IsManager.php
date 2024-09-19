<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next) : Response
    {
        if (Auth::check() && Auth::user()->role === 'manager') {
            return $next($request);
        }

        return response()->json([
            'message' => 'Unauthorized. Hanya Manager yang dapat mengakses ini.',
        ], 403);
    }
}