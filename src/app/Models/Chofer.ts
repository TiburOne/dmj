import { Transportista } from "./Transportista";
import { ViajeComun } from "./ViajeComun";

export interface Chofer {
  id: number | undefined;
  idTransportista: number;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  dni?: number;
  cuit?: number;
  createdAt?: string;
  updatedAt?: string;
  viajes?: ViajeComun[]; // Asociación con viajes comunes
  transportista: Transportista
}
