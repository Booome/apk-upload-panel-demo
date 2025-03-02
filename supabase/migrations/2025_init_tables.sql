-- Create the `users` table
CREATE TABLE users (
  id UUID REFERENCES auth.users ON DELETE CASCADE, -- Links to Supabase Auth users
  PRIMARY KEY (id)
);

-- Enable Row Level Security (RLS) on the `users` table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to read their own data
CREATE POLICY "Users can read their own data"
ON users
FOR SELECT
USING (auth.uid() = id);

-- Create the `apk_files` table
CREATE TABLE apk_files (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  owner UUID REFERENCES users(id) ON DELETE CASCADE, -- Links to the `users` table
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on the `apk_files` table
ALTER TABLE apk_files ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow users to read their own APK files
CREATE POLICY "Users can read their own APK files"
ON apk_files
FOR SELECT
USING (auth.uid() = owner);

-- Create a policy to allow users to insert their own APK files
CREATE POLICY "Users can insert their own APK files"
ON apk_files
FOR INSERT
WITH CHECK (auth.uid() = owner);

-- Create a policy to allow users to update their own APK files
CREATE POLICY "Users can update their own APK files"
ON apk_files
FOR UPDATE
USING (auth.uid() = owner);

-- Create a policy to allow users to delete their own APK files
CREATE POLICY "Users can delete their own APK files"
ON apk_files
FOR DELETE
USING (auth.uid() = owner);

-- Create a function to insert a new user into the `users` table with improved security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Create a trigger to call the function when a new user is created in `auth.users`
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();