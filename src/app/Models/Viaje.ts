// viaje-comun.model.ts

import { Base } from "./Base";
import { Chofer } from "./Chofer";
import { Especie } from "./Especie";
import { EstadoViajes } from "./EstadoViaje";
import { Ubicacion } from "./Ubicacion";

export class ViajeComun implements Base {
  id: number;
  id_creador: number | undefined;
  id_ubicacion_origen: number;
  id_ubicacion_destino: number;
  id_especie: number;
  tipo_tarifa: 'Por Tonelada' | 'Por Kilometro' | 'Fija';
  id_estado: number;
  TiposAcoplados: number[];
  id_camion?: number;
  idAcoplado?: number;
  id_carta_porte?: number;
  idChofer?: number;
  valor_tarifa?: number;
  cantidad?: number;

  Origen?: Ubicacion;
  Destino?: Ubicacion;
  Chofer?: Chofer;
  Especie?: Especie;
  EstadoViaje?: EstadoViajes

  constructor(data: any) {
    this.id = data.id;
    this.id_creador = data.id_creador || undefined;
    this.id_ubicacion_origen = data.idUbicacionOrigen;
    this.id_ubicacion_destino = data.idUbicacionDestino;
    this.id_especie = data.idEspecie;
    this.tipo_tarifa = data.tipoTarifa;
    this.id_estado = data.idEstado;
    this.TiposAcoplados = Array.isArray(data.idTipoAcoplado) ? data.idTipoAcoplado : [];
    this.id_camion = data.idCamion || undefined;
    this.idAcoplado = data.idAcoplado || undefined;
    this.id_carta_porte = data.idCartaPorte || undefined;
    this.idChofer = data.idChofer || undefined;
    this.valor_tarifa = data.valor_tarifa || undefined;
    this.Chofer = data.chofer || undefined;
    this.Destino = data.destino || undefined;
    this.Origen = data.origen || undefined;
    this.Especie =  data.especie || undefined
    this.EstadoViaje = data.estadoViaje || undefined;
    this.cantidad = data.cantidad || undefined;
  }

  getText(): string {
    let text = "";
    text += this.Origen ? this.Origen.direccion : "";
    text += this.Destino ? this.Destino.direccion : "";
    text += this.Chofer ? this.Chofer.nombre : "";


    return text;
  }
}
