-- Modify categories column to be an array with a default empty array
ALTER TABLE favorites 
ALTER COLUMN categories SET DEFAULT '{}';

-- Update existing rows to have an empty array if null
UPDATE favorites 
SET categories = '{}' 
WHERE categories IS NULL;
