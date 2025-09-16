<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Proxies
    |--------------------------------------------------------------------------
    |
    | Tady nastavíš IP adresy, nebo `*` pokud máš reverzní proxy (Traefik, Nginx)
    | a chceš jí věřit.
    |
    */

    'proxies' => '*',

    /*
    |--------------------------------------------------------------------------
    | Headers
    |--------------------------------------------------------------------------
    |
    | Tohle nech defaultní, aby Laravel bral X-Forwarded-* hlavičky.
    |
    */

    'headers' =>
        Illuminate\Http\Request::HEADER_X_FORWARDED_FOR |
        Illuminate\Http\Request::HEADER_X_FORWARDED_HOST |
        Illuminate\Http\Request::HEADER_X_FORWARDED_PORT |
        Illuminate\Http\Request::HEADER_X_FORWARDED_PROTO |
        Illuminate\Http\Request::HEADER_X_FORWARDED_PREFIX |
        Illuminate\Http\Request::HEADER_X_FORWARDED_AWS_ELB,

];
