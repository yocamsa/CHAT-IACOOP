-- Add extra profile fields for registration
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS entity text,
ADD COLUMN IF NOT EXISTS position text,
ADD COLUMN IF NOT EXISTS whatsapp text,
ADD COLUMN IF NOT EXISTS want_contact boolean NOT NULL DEFAULT false;

-- Update handle_new_user function to include new fields (set from raw_user_meta_data if available)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, messages_left, first_name, last_name, entity, position, whatsapp, want_contact)
  VALUES (
    NEW.id,
    'usuario',
    10,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.raw_user_meta_data ->> 'entity',
    NEW.raw_user_meta_data ->> 'position',
    NEW.raw_user_meta_data ->> 'whatsapp',
    COALESCE((NEW.raw_user_meta_data ->> 'want_contact')::boolean, false)
  )
  ON CONFLICT (id) DO UPDATE
  SET role = EXCLUDED.role,
      messages_left = EXCLUDED.messages_left,
      first_name = EXCLUDED.first_name,
      last_name = EXCLUDED.last_name,
      entity = EXCLUDED.entity,
      position = EXCLUDED.position,
      whatsapp = EXCLUDED.whatsapp,
      want_contact = EXCLUDED.want_contact;
  RETURN NEW;
END;
$$;

-- Recreate trigger to ensure updated function is used
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
