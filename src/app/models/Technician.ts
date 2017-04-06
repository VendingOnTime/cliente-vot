import * as uuid from 'uuid/v4';

export class Technician {

  public id : string = uuid();

  public constructor(
    public name : string
  ) {}
}
