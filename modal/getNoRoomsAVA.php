<?php
include "connect.php";
$sql = "SELECT * FROM rooms WHERE state='0'";
$result = mysqli_query($cn, $sql);
$out = mysqli_num_rows($result);

echo $out;

mysqli_close($cn);
