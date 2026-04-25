import { supabase } from './supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Función de ayuda para llamadas directas a la API de Supabase Auth
const authFetch = async (path, options = {}) => {
  const url = `${supabaseUrl}/auth/v1${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'apikey': supabaseServiceRoleKey,
      'Authorization': `Bearer ${supabaseServiceRoleKey}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.msg || 'Error en la API de autenticación');
  }

  // Some endpoints return 200/204 without body
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

// Función para obtener todos los perfiles con sus correos
export const getAllUsers = async () => {
  try {
    // 1. Obtener todos los usuarios de Auth usando la API directamente
    const usersData = await authFetch('/admin/users');
    const users = usersData.users || usersData; // Depende de la estructura de la respuesta
    
    // 2. Obtener los perfiles (RLS está abierto en el prototipo, así que el cliente normal funciona)
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*');

    if (profilesError) throw profilesError;

    // 3. Combinar usuarios y perfiles
    return users.map(user => {
      const profile = profiles.find(p => p.id === user.id) || { role: 'usuario' };
      return {
        id: user.id,
        email: user.email,
        role: profile.role,
        createdAt: user.created_at
      };
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Función para crear un nuevo usuario y su perfil
export const createUser = async (email, password, role, avatarUrl) => {
  try {
    // 1. Crear el usuario en auth.users vía fetch
    const newUser = await authFetch('/admin/users', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        email_confirm: true
      })
    });

    // 2. El trigger (handle_new_user) ya habrá creado el perfil como 'usuario'.
    // Actualizamos el rol o avatar si es necesario.
    if (role === 'admin' || avatarUrl) {
      const updates = {};
      if (role === 'admin') updates.role = 'admin';
      if (avatarUrl) updates.avatar_url = avatarUrl;

      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', newUser.id);

      if (profileError) throw profileError;
    }

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Función para actualizar rol
export const updateUserRole = async (userId, newRole) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating role:', error);
    throw error;
  }
};

// Función para eliminar usuario
export const deleteUser = async (userId) => {
  try {
    // Borrar el usuario de Auth (con CASCADE borrará el perfil)
    await authFetch(`/admin/users/${userId}`, {
      method: 'DELETE'
    });
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
