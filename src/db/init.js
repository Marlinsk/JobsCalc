const Database = require('./config')

const initdb = {

    async init(){

const db = await Database();
    
await db.exec(`
    CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hours INT         
)`);

await db.exec(`
    CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    createdAt DATETIME
)`);

await db.run(`
    INSERT INTO profile(
    name, 
    avatar, 
    monthly_budget, 
    days_per_week, 
    hours_per_day, 
    vacation_per_year, 
    value_hours
    ) VALUES(
        "Marlon Rodrigues", 
        "https://avatars.githubusercontent.com/u/56139126?s=460&v=4",
        2000,
        7,
        6,
        3,
        75 
    )`);

await db.run(`
    INSERT INTO jobs(
    name, 
    daily_hours,
    total_hours,
    createdAt    
) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376018
)`);

await db.run(`
    INSERT INTO jobs(
    name, 
    daily_hours,
    total_hours,
    createdAt    
) VALUES (
    "OneTwo Project",
    3,
    47,
    1617514376018
)`);

await db.close();

    }
}

initdb.init()