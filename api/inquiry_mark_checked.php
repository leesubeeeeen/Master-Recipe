<?php
$id = $_POST["id"];

$path = "../data/inquiries.json";
$data = json_decode(file_get_contents($path), true);

foreach ($data as &$item) {
    if ($item["id"] == $id) {
        $item["checked"] = true;
        break;
    }
}

file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "ok";
