<?php

$logFile = __DIR__ . '/log.jsonl';

if (!file_exists($logFile)) {
    touch($logFile);
}

$ip = $_SERVER['REMOTE_ADDR'];
$agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$timestamp = date('c'); // ISO 8601 timestamp

if (isset($_GET['stats']) && $_GET['stats'] == 1) {
    $unique = [];

    foreach (file($logFile) as $line) {
        $entry = json_decode($line, true);
        if (!$entry) continue;

        $key = $entry['ip'] . '|' . $entry['agent'];
        if (!isset($unique[$key])) {
            $unique[$key] = [
                'ip' => $entry['ip'],
                'agent' => $entry['agent'],
                'firstSeen' => $entry['timestamp']
            ];
        }
    }

    $response = [
        'uniqueCount' => count($unique),
        'requestors' => array_values($unique)
    ];

    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
    exit;
}

// Log the current request
$entry = [
    'ip' => $ip,
    'agent' => $agent,
    'timestamp' => $timestamp
];

file_put_contents($logFile, json_encode($entry) . "\n", FILE_APPEND);
http_response_code(204); // No Content
