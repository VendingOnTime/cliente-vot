import {MachineType} from "./MachineType";
import {MachineState} from "./MachineState";

export interface Machine {

  location : string,
  type : MachineType,
  state : MachineState,
  associatedTechnician : string,
  description : string

}
