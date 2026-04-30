-- Add messages_left column with default for new profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS messages_left integer NOT NULL DEFAULT 10;

-- Update handle_new_user function to set role and messages_left on creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, messages_left)
  VALUES (NEW.id, 'usuario', 10)
  ON CONFLICT (id) DO UPDATE
  SET role = EXCLUDED.role,
      messages_left = EXCLUDED.messages_left;
  RETURN NEW;
END;
$$;

-- Recreate trigger to ensure updated function is used
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RPC to atomically decrement messages_left
CREATE OR REPLACE FUNCTION public.decrement_message_count()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE public.profiles
  SET messages_left = GREATEST(messages_left - 1, 0)
  WHERE id = auth.uid()
  RETURNING messages_left INTO new_count;

  RETURN COALESCE(new_count, 0);
END;
$$;

GRANT EXECUTE ON FUNCTION public.decrement_message_count() TO authenticated;
