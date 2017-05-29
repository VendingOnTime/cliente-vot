import {MachineType} from "./MachineType";
import {MachineState} from "./MachineState";
import {Technician} from "./Technician";
import {Location} from "./Location";
import * as uuid from 'uuid/v4';


export class Machine {

  public id: string = '';

  public constructor(
    public location : Location,
    public machineType : MachineType,
    public machineState : MachineState,
    public technician : Technician,
    public description : string
  ) {
  }
}
