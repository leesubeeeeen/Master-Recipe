<?php
header("Content-Type: application/json; charset=utf-8");
echo file_get_contents("../data/recipes.json"); //해당 json 파일로부터 레시피를 로드해온다.
?>
