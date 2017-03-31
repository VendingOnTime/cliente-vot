enum AutocompleteLists {
  paises = 0,
  romano = 1
}
export namespace AutocompleteList {
  export function getList(id: string) : string[]{
    // TODO Falta conectar esto con los services que den las listas requeridas
    switch (parseInt(id)) {
      case AutocompleteLists.paises:
        return ["Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
          "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
          "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
          "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
          "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
          "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
          "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
          "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];
      case AutocompleteLists.romano:
        return ["Ave", "Cesar"];
      default:
        return [];
    }
  }
}
