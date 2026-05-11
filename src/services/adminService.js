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
      const profile = profiles.find(p => p.id === user.id) || { role: 'usuario', messages_left: 0 };
      return {
        id: user.id,
        email: user.email,
        role: profile.role,
        messages_left: profile.messages_left,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        entity: profile.entity || '',
        position: profile.position || '',
        whatsapp: profile.whatsapp || '',
        want_contact: profile.want_contact || false,
        avatar_url: profile.avatar_url || null,
        createdAt: user.created_at
      };
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Función para crear un nuevo usuario y su perfil
export const createUser = async (email, password, role, avatarUrl, extraFields = {}) => {
  try {
    // 1. Crear el usuario en auth.users vía fetch con metadatos
    const newUser = await authFetch('/admin/users', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          first_name: extraFields.first_name || '',
          last_name: extraFields.last_name || '',
          entity: extraFields.entity || '',
          position: extraFields.position || '',
          whatsapp: extraFields.whatsapp || '',
          want_contact: extraFields.want_contact || false
        }
      })
    });

    // 2. El trigger (handle_new_user) ya habrá creado el perfil con los metadatos.
    // Actualizamos el rol o avatar si es necesario.
    const updates = {};
    if (role === 'admin') updates.role = 'admin';
    if (avatarUrl) updates.avatar_url = avatarUrl;

    // Si hay extraFields que no se pasaron en metadata, los actualizamos directo
    if (Object.keys(updates).length > 0) {
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

// Función para actualizar el límite de mensajes
export const updateUserLimit = async (userId, newLimit) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ messages_left: newLimit })
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating messages_left:', error);
    throw error;
  }
};

// Función para actualizar cualquier campo del perfil de un usuario (admin)
export const updateUserProfile = async (userId, profileData) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Función para actualizar perfil con campos extra (usada en registro público)
// Usa la clave de servicio para bypass de RLS
export const updateProfileFields = async (userId, fields) => {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseServiceRoleKey,
        'Authorization': `Bearer ${supabaseServiceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(fields)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Error actualizando perfil');
    }

    return true;
  } catch (error) {
    console.error('Error updating profile fields:', error);
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
