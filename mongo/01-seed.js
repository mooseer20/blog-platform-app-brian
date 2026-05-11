db = db.getSiblingDB('blog');

// Clear existing to avoid duplicates during testing
db.comments.drop();

db.comments.insertMany([
    // Comments for Post 1
    { post_id: 1, author: "Brian", text: "This gave me actual chills. Great writing!", date: new Date() },
    { post_id: 1, author: "Elena", text: "I think I've seen that manor before...", date: new Date() },
    
    // Comments for Post 2
    { post_id: 2, author: "Aegon", text: "Classic Velvet Whisper style. Love the moon imagery.", date: new Date() },
    
    // Comments for Post 3
    { post_id: 3, author: "Stefan", text: "Some secrets are better left buried, trust me.", date: new Date() },
    { post_id: 3, author: "Klaus", text: "Boring. I prefer the truth to be out in the open.", date: new Date() },
    
    // Comments for Post 4
    { post_id: 4, author: "Damon", text: "Violence is such a strong word. I prefer 'enthusiasm'.", date: new Date() },
    { post_id: 4, author: "Elena", text: "Damon, stop. This post is actually serious.", date: new Date() },

    // Comments for Post 5
    { post_id: 5, author: "Brian", text: "The lore here is getting deep. Is there a book coming?", date: new Date() },
    
    // Comments for Post 6
    { post_id: 6, author: "Stefan", text: "Those letters belong to my family. How did you find them?", date: new Date() },
    { post_id: 6, author: "Aegon", text: "The mystery of the letters is the best arc so far.", date: new Date() }
]);

print('MongoDB: Seeded with 10 detailed comments.');