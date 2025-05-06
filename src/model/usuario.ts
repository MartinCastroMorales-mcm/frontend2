
export type usuarioModel = {
    nombre_usuario: string
    clave_usuario: string
    correo_usuario: string
    rol_usuario: number 
}
export default usuarioModel;

//TODO: como configuro los roles
export type roles = {
    0: "ADMIN",
    1: "SIMPLE"
}
