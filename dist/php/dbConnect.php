<?php
// $input_error = $_POST['input_error']
if(isset($_POST['fridge_send'])){
    if(!empty($_POST['fridge_name']) && !str_contains($_POST['fridge_name'], "\\") && !str_contains($_POST['fridge_name'],'/')){
        $input_error = "";
        $conn = mysqli_connect('localhost', 'root', '', 'fridge');
        if($conn){
            $fridge_name = $_POST['fridge_name'];

            $query = "SELECT * FROM fridge WHERE name='$fridge_name'";
            $result = mysqli_query($conn,$query);

            $fridges = mysqli_fetch_all($result,MYSQLI_ASSOC);

            if(!count($fridges)){
                $query = "INSERT INTO fridge(name,all_notes,now_notes,array_notes) VALUES('$fridge_name',0,0,'[]')";

                mysqli_query($conn, $query);

                $query = "SELECT * FROM fridge WHERE name='$fridge_name'";
                $result = mysqli_query($conn,$query);
                $fridges = mysqli_fetch_all($result, MYSQLI_ASSOC);
            }
            mysqli_free_result($result);
            mysqli_close($conn);

            $str = json_encode($fridges);
            // $str = unicode_decode($str);
            echo $str;
            file_put_contents('fridgeData.json',$str);
            header('Location: ../fridge.html');
            exit();
        }
        else{
            // $input_error = "Brak połączenia z bazą!";
            // $_POST['input_error'] = $input_error;
            header('Location: ../index.html');
            exit();
        }
    }
    else{
        if(str_contains($_POST['fridge_name'], "\\") || str_contains($_POST['fridge_name'],'/')){
            
            // $input_error = "Zła nazwa!";
            // $_POST['input_error'] = $input_error;
            header('Location: ../index.html');
            exit();
        }
        else{
            // $input_error = "Podaj nazwę!";
            // $_POST['input_error'] = $input_error;
            header('Location: ../index.html');
            exit();
        }
    }
    
} 
?>