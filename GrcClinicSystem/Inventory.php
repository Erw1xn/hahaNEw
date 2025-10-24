<?php
session_start();

// Redirect to login page if not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.html");
    exit;
}

// Get full name (make sure you store it in session as $_SESSION['full_name'])
$userName = isset($_SESSION['full_name']) ? $_SESSION['full_name'] : 'Guest User';
?>