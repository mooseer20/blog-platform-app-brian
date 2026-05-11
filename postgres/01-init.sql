-- Ensure tables exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- More Users
INSERT INTO users (username) VALUES 
('Aegon'),
('Brian'),
('Damon'),
('Elena'),
('Klaus'),
('Stefan')
ON CONFLICT (username) DO NOTHING;

-- More Blog Posts
INSERT INTO posts (title, content, user_id) VALUES 
('The Midnight Echo', 'The silence was louder than the screams in the abandoned manor...', 1),
('Crimson Rebirth', 'Every century, the velvet moon rises to claim what was lost.', 3),
('Shadows of Mystic Falls', 'There are secrets buried beneath the town square that should stay hidden.', 5),
('The Doppelganger Curse', 'History repeats itself in the most violent ways imaginable.', 4),
('Hybrid Origins', 'Power is not given; it is taken through blood and ancient ritual.', 5),
('Letters from 1864', 'I found a box of old letters today. They were still stained with dried blood.', 6);