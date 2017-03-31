enum AutocompleteLists {
  paises = 0,
  romano = 1
}
export namespace AutocompleteList {
  export function getList(id: string) : {}{
    // TODO Falta conectar esto con los services que den las listas requeridas
    switch (parseInt(id)) {
      case AutocompleteLists.paises:
        return {"0":"Burriana","1":"Bartolomeo"};
      case AutocompleteLists.romano:
        return {"0":"Ave","1":"Cesar"};
      default:
        return {};
    }
  }
}
