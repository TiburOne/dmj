// viaje-comun.model.ts

import { Base } from "./Base";
import { Chofer } from "./Chofer";
import { Ubicacion } from "./Ubicacion";

export class ViajeComun implements Base {
  id: number;
  idUbicacionOrigen: number;
  idUbicacionDestino: number;
  idEspecie: number;
  tipoTarifa: 'Por Tonelada' | 'Por Kilometro' | 'Fija';
  idEstado: number;
  idTipoAcoplado: number;
  idCamion?: number;
  idAcoplado?: number;
  idCartaPorte?: number;
  idChofer?: number;

  origen?: Ubicacion;
  destino?: Ubicacion;
  chofer?: Chofer

  constructor(data: any) {
    this.id = data.id;
    this.idUbicacionOrigen = data.idUbicacionOrigen;
    this.idUbicacionDestino = data.idUbicacionDestino;
    this.idEspecie = data.idEspecie;
    this.tipoTarifa = data.tipoTarifa;
    this.idEstado = data.idEstado;
    this.idTipoAcoplado = data.idTipoAcoplado;
    this.idCamion = data.idCamion;
    this.idAcoplado = data.idAcoplado;
    this.idCartaPorte = data.idCartaPorte;
    this.idChofer = data.idChofer;

    this.chofer = data.chofer || undefined;
    this.destino = data.destino || undefined;
    this.origen = data.origen || undefined;
  }

  getText(): string {
    let text = "";
    text += this.origen ? this.origen.direccion : "";
    text += this.destino ? this.destino.direccion : "";
    text += this.chofer ? this.chofer.nombre : "";


    return text;
  }
}
