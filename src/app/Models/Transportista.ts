export interface Transportista {
  id?: number; // Optional porque se autoincrementa en la base de datos
  cuit: number;
  nombre: string;
  email?: string; // Optional porque no todos los campos son obligatorios
  telefono?: string;
  password?: string; // Optional, dependiendo de si quieres exponer esta propiedad
  createdAt?: string;
  updatedAt?: string;
}
