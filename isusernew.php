<?php

$logFile = __DIR__ . '/log.jsonl';

// Ensure the log file exists
if (!file_exists($logFile)) {
    touch($logFile);
}

$ip = $_SERVER['REMOTE_ADDR'];
$agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
$key = $ip . '|' . $agent;

$isNew = true;

foreach (file($logFile) as $line) {
    $entry = json_decode($line, true);
    if (!$entry) continue;

    $entryKey = $entry['ip'] . '|' . $entry['agent'];
    if ($entryKey === $key) {
        $isNew = false;
        break;
    }
}

header('Content-Type: application/json');
echo json_encode($isNew);
