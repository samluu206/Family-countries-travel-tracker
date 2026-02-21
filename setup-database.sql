-- Family Countries Travel Tracker - Database Setup
-- Run this script in your Neon SQL Editor

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  country_code CHAR(2) PRIMARY KEY,
  country_name VARCHAR(100) NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(15) UNIQUE NOT NULL,
  color VARCHAR(15)
);

-- Create visited_countries table
CREATE TABLE IF NOT EXISTS visited_countries (
  id SERIAL PRIMARY KEY,
  country_code CHAR(2) NOT NULL,
  user_id INTEGER REFERENCES users(id)
);

-- Insert initial users
INSERT INTO users (name, color)
VALUES ('Angela', 'teal'), ('Jack', 'powderblue')
ON CONFLICT (name) DO NOTHING;

-- Insert some sample visited countries (optional)
INSERT INTO visited_countries (country_code, user_id)
VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2)
ON CONFLICT DO NOTHING;

-- Insert sample countries data (you can add more)
INSERT INTO countries (country_code, country_name) VALUES
('AF', 'Afghanistan'),
('AL', 'Albania'),
('DZ', 'Algeria'),
('AR', 'Argentina'),
('AU', 'Australia'),
('AT', 'Austria'),
('BD', 'Bangladesh'),
('BE', 'Belgium'),
('BR', 'Brazil'),
('CA', 'Canada'),
('CN', 'China'),
('DK', 'Denmark'),
('EG', 'Egypt'),
('FI', 'Finland'),
('FR', 'France'),
('DE', 'Germany'),
('GR', 'Greece'),
('HK', 'Hong Kong'),
('IN', 'India'),
('ID', 'Indonesia'),
('IR', 'Iran'),
('IQ', 'Iraq'),
('IE', 'Ireland'),
('IL', 'Israel'),
('IT', 'Italy'),
('JP', 'Japan'),
('KE', 'Kenya'),
('KR', 'South Korea'),
('MY', 'Malaysia'),
('MX', 'Mexico'),
('NL', 'Netherlands'),
('NZ', 'New Zealand'),
('NG', 'Nigeria'),
('NO', 'Norway'),
('PK', 'Pakistan'),
('PH', 'Philippines'),
('PL', 'Poland'),
('PT', 'Portugal'),
('RU', 'Russia'),
('SA', 'Saudi Arabia'),
('SG', 'Singapore'),
('ZA', 'South Africa'),
('ES', 'Spain'),
('SE', 'Sweden'),
('CH', 'Switzerland'),
('TW', 'Taiwan'),
('TH', 'Thailand'),
('TR', 'Turkey'),
('UA', 'Ukraine'),
('AE', 'United Arab Emirates'),
('GB', 'United Kingdom'),
('US', 'United States'),
('VN', 'Vietnam')
ON CONFLICT (country_code) DO NOTHING;
