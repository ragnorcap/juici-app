-- Create user_preferences table
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'light',
    notification_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create idea_history table
CREATE TABLE idea_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    idea_text TEXT NOT NULL,
    generated_prd TEXT,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    favorite BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}'
);

-- Set up RLS for user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences"
    ON user_preferences FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
    ON user_preferences FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
    ON user_preferences FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Set up RLS for idea_history
ALTER TABLE idea_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own idea history"
    ON idea_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own idea history"
    ON idea_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own idea history"
    ON idea_history FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idea_history_user_id_idx ON idea_history(user_id);
CREATE INDEX idea_history_generated_at_idx ON idea_history(generated_at);
CREATE INDEX idea_history_favorite_idx ON idea_history(favorite);

-- Add trigger for updating timestamps
CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to standardize dates to Mar 20, 2025
CREATE OR REPLACE FUNCTION standardize_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.generated_at = '2025-03-20 12:00:00+00'::TIMESTAMPTZ;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to standardize dates
CREATE TRIGGER standardize_idea_history_dates
    BEFORE INSERT ON idea_history
    FOR EACH ROW
    EXECUTE FUNCTION standardize_date(); 