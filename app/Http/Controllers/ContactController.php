<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use App\Mail\ContactMessage;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Contact');
    }

    public function send(Request $request)
    {
        Log::debug('ContactController@send invoked', $request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email:rfc,dns|max:100',
            'message' => 'required|string|max:2000',
        ]);

        $key = 'contact:' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            Log::warning('Rate limit exceeded on contact form', [
                'ip' => $request->ip(),
                'email' => $validated['email'] ?? null,
            ]);

            return redirect()->back()->withErrors([
                'message' => 'Příliš mnoho pokusů. Zkuste to prosím za minutu.',
            ]);
        }
        RateLimiter::hit($key, 60);

        try {
            $recipient = config('mail.contact_to');
            $mail = new ContactMessage($validated);

            if (app()->environment('production')) {
                // Produkce: vždy Brevo + fallback
                Log::debug('Production env: sending via Brevo API', [
                    'to' => $recipient,
                    'from' => $validated['email'],
                ]);

                $ok = $mail->sendViaBrevo();

                if (!$ok) {
                    Log::warning('Brevo send failed, falling back to Mail driver');
                    Mail::to($recipient)->send($mail);
                }
            } else {
                // Dev/test: zkus Brevo, pokud selže → Mailhog
                Log::debug('Dev/test env: trying Brevo API first');
                $ok = $mail->sendViaBrevo();

                if (!$ok) {
                    Log::warning('Brevo send failed in dev, falling back to Mailhog');
                    Mail::to($recipient)->send($mail);
                }
            }

            Log::info('Contact message processed successfully', [
                'to' => $recipient,
                'from' => $validated['email'],
            ]);

            return redirect()->back()->with('success', 'Zpráva byla přijata ke zpracování.');
        } catch (\Throwable $e) {
            Log::error('Mail sending failed', [
                'err' => $e->getMessage(),
                'from' => $validated['email'] ?? null,
                'ip' => $request->ip(),
            ]);

            return redirect()->back()->withErrors([
                'message' => 'Zprávu se nepodařilo odeslat. Zkuste to později.',
            ]);
        }
    }
}
