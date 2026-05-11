<?php
header("Content-Type: application/json");

try {
    $pdo = new PDO("pgsql:host=postgres;dbname=blog", "user", "pass");
    $mongo = new MongoDB\Driver\Manager("mongodb://mongo:27017");
    $redis = new Redis();
    $redis->connect('redis', 6379);

    // Check if React asked for a specific post (e.g., ?id=1)
    if (isset($_GET['id'])) {
        $postId = (int)$_GET['id'];
        
        // 1. Postgres: Get specific post AND the author's username
        $stmt = $pdo->prepare("
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            WHERE posts.id = ?
        ");
        $stmt->execute([$postId]);
        $post = $stmt->fetch(PDO::FETCH_ASSOC);

        // 2. Redis: Increment views
        $views = $redis->incr("post:{$postId}:views");

        // 3. Mongo: Get comments
        $comments = [];
        try {
            $query = new MongoDB\Driver\Query(['post_id' => $postId]);
            $cursor = $mongo->executeQuery('blog_db.comments', $query);
            $comments = $cursor->toArray();
        } catch (Exception $e) {}

        echo json_encode(["post" => $post, "views" => $views, "comments" => $comments]);
    
    } else {
        // FEED VIEW: If no ID is given, fetch ALL posts from Postgres
        $stmt = $pdo->query("
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            ORDER BY posts.id ASC
        ");
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["feed" => $posts]);
    }

} catch (Exception $e) {
    echo json_encode(["error" => "Database connection failed"]);
}