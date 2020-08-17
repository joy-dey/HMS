<?php
include "connect.php";
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$decision = $data->decision;
$presql = "SELECT type,student FROM rfl WHERE id='" . $id . "'";
$preresult = mysqli_query($cn, $presql) or die(mysqli_error($cn));
if ($preresult) {
    while ($row = mysqli_fetch_assoc($preresult)) {
        $tempT = $row['type'];
        $tempPh = $row['student'];
    }
    if ($decision == "1") {
        if ($tempT == "Permanent") {
            $delsql = "UPDATE rfl SET state='" . $decision . "' WHERE id='" . $id . "'";
            $delresult = mysqli_query($cn, $delsql) or die(mysqli_error($cn));
            if ($delresult) {
                $dlsql = "UPDATE rooms SET state='0',user='NA' WHERE user='" . $tempPh . "'";
                $dlresult = mysqli_query($cn, $dlsql) or die(mysqli_error($cn));
                if ($dlresult) {
                    $dllsql = "UPDATE student_reg SET allocation='N/A' WHERE phone='" . $tempPh . "'";
                    $dllresult = mysqli_query($cn, $dllsql) or die(mysqli_error($cn));
                    if ($dllresult) {
                        echo "YES";
                    } else {
                        echo "NO";
                    }
                } else {
                    echo "NO";
                }
            } else {
                echo "NO";
            }
        } else {
            $dslsql = "UPDATE rfl SET state='" . $decision . "' WHERE id='" . $id . "'";
            $dslresult = mysqli_query($cn, $dslsql) or die(mysqli_error($cn));
            if ($dslresult) {
                echo "YES";
            } else {
                echo "NO";
            }
        }
    } else {
        $sql = "UPDATE rfl SET state='" . $decision . "' WHERE id='" . $id . "'";
        $result = mysqli_query($cn, $sql) or die(mysqli_error($cn));
        if ($result) {
            echo "YES";
        } else {
            echo "NO";
        }
    }
} else {
    echo "<br><h2>ID NOT FOUND</h2>";
}


mysqli_close($cn);
