import { createClient } from "@supabase/supabase-js"
import type { Database } from "../supabase/database.types"

export async function syncAuthRoles() {
  try {
    // Crear cliente de Supabase con la clave de servicio para acceso administrativo
    const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    )

    // 1. Obtener todos los usuarios de Auth
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()

    if (authError) {
      throw new Error(`Error al obtener usuarios de Auth: ${authError.message}`)
    }

    console.log(`Encontrados ${authUsers.users.length} usuarios en Auth`)

    // 2. Obtener todos los roles disponibles
    const { data: roles, error: rolesError } = await supabaseAdmin.from("roles").select("id, nombre")

    if (rolesError) {
      throw new Error(`Error al obtener roles: ${rolesError.message}`)
    }

    // Crear un mapa de nombres de roles a IDs para búsqueda rápida
    const roleMap = new Map(roles.map((role) => [role.nombre, role.id]))

    // 3. Obtener usuarios existentes en roles_usuario
    const { data: existingRoleUsers, error: existingError } = await supabaseAdmin
      .from("roles_usuario")
      .select("user_id, role_id")

    if (existingError) {
      throw new Error(`Error al obtener roles de usuario existentes: ${existingError.message}`)
    }

    // Crear un conjunto de IDs de usuario que ya tienen roles asignados
    const existingUserIds = new Set(existingRoleUsers.map((ru) => ru.user_id))

    // 4. Sincronizar roles para cada usuario
    const rolesToInsert = []

    for (const user of authUsers.users) {
      // Si el usuario ya tiene un rol asignado en la tabla, omitirlo
      if (existingUserIds.has(user.id)) {
        continue
      }

      // Obtener el rol de los metadatos del usuario o asignar 'cliente' por defecto
      const userRole = (user.user_metadata?.role || "cliente").toLowerCase()

      // Obtener el ID del rol correspondiente
      const roleId = roleMap.get(userRole)

      if (roleId) {
        rolesToInsert.push({
          user_id: user.id,
          role_id: roleId,
          created_at: new Date().toISOString(),
        })
      } else {
        console.warn(`Rol "${userRole}" no encontrado para usuario ${user.id}`)
      }
    }

    // 5. Insertar nuevos registros de roles de usuario
    if (rolesToInsert.length > 0) {
      const { error: insertError } = await supabaseAdmin.from("roles_usuario").insert(rolesToInsert)

      if (insertError) {
        throw new Error(`Error al insertar roles de usuario: ${insertError.message}`)
      }

      console.log(`Sincronizados ${rolesToInsert.length} usuarios con sus roles`)
    } else {
      console.log("No hay nuevos usuarios para sincronizar")
    }

    return { success: true, message: "Sincronización completada con éxito" }
  } catch (error) {
    console.error("Error en la sincronización de roles:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido en la sincronización",
    }
  }
}
