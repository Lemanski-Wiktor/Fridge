<?php
    // $input_err = ""
    if(isset($_POST["fridge_name"])){
        $conn = mysqli_connect('localhost', 'root', '', 'fridge');
        if($conn){
            $name = $_POST['fridge_name'];
            $all_notes = $_POST['all_notes'];
            $now_notes = $_POST['now_notes'];
            $array_notes = $_POST['array_notes'];

            $query = "UPDATE fridge SET all_notes='$all_notes',now_notes='$now_notes',array_notes='$array_notes' WHERE fridge.name='$name'";

            mysqli_query($conn,$query);
            mysqli_close($conn);
        }
        // else{
        //     $input_error = "Brak połączenia z bazą!"
        // }
    }
?>