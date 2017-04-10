import {MachineType} from "./MachineType";
import {MachineState} from "./MachineState";
import {Technician} from "./Technician";
import {Position} from "./Position";
import * as uuid from 'uuid/v4';


export class Machine {

  public id : string = uuid();

  public constructor(
    public position : Position,
    public machineType : MachineType,
    public machineState : MachineState,
    public technician : Technician,
    public lastUpdate : string
  ) {

  }

}
