import { TipoAcoplado } from "./Tipo_Acoplado";
import { Transportista } from "./Transportista";

export interface Acoplado {
  id: number;
  idTransportista: number;
  dominio: string;
  idTipoAcoplado: number;
  transportista?: Transportista; // Suponiendo que tienes un DTO para Transportista
  tipoAcoplado?: TipoAcoplado; // Suponiendo que tienes un DTO para TipoAcoplado
}
