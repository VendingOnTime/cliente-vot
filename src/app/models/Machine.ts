import {MachineType} from "./MachineType";
import {MachineState} from "./MachineState";

export interface Machine {

  location : string,
  type : MachineType,
  state : MachineState,
  associatedTechnician : string,
  description : string

}

import {Technician} from "./Technician";
import {Position} from "./Position";

export class Machine {

  public id : string;
  public position : Position = new Position();
  public machineType : MachineType;
  public machineState : MachineState;
  public technician : Technician = new Technician();
  public lastUpdate : string;

}
