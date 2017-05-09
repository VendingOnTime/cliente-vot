export const es_locales = {
  forms : {
    placeholder: {
      location: "Localización",
      description: "Descripción",
      user: "Usuario",
      password: "Contraseña",
      confirm_password: "Confirmar contraseña",
      email: "Email",
      dni: "DNI",
      name: "Nombre",
      surname: "Apellidos",
      new_password: "Introduce nueva contraseña"
    },
    error: {
      isRequired : "Se requiere el campo",

      incorrectPositionLength : "Localización solo puede tener más 140 carácteres",
      incorrectPositionFormat : "Localización no puede contener carácteres especiales",

      incorrectDescriptionMinLength : "Localización debe tener más 2 carácteres",
      incorrectDescriptionLength : "La descripción es demasiado larga",
      incorrectDescriptionFormat : "Descripción no puede contener carácteres especiales",

      technicianError : "Es requerido que la administre alguien",

      required_username : "Ha de introducirse un nombre de usuario",
      short_username : "El nombre de usuario es demasiado corto",
      large_username : "El nombre de usuario es demasiado largo",
      format_username : "El nombre de usuario no puede contener caracteres especiales",

      required_email : "Ha de introducirse un email",
      format_email : "El formato del email no está admitido",

      required_password : "Es necesario introducir una contraseña",
      format_password : "La contraseña no es lo suficientemente segura",
      confirm_password_placeholder : "Confirmar contraseña",
      equal_passwords : "La contraseña introducida es diferente",

      login_error : "La combinación de usuario y contraseña introducida es incorrecta",
    }
  },
  component : {
    add_machine : {
      title : "Añadir máquina"
    },

    list_machine : {
      title : "Mis Máquinas",
      numSelections_1 : " ha sido seleccionada",
      numSelections_more_than_1 : " han sido seleccionadas",
      modify : "Modificar",
      createIssue : "Crear incidencia",
      delete_machine : "Eliminar",
      add_machine : "Añadir maquina",
      state : "Estado",
      location : "Ubicación",
      last_update : "Última actualización",
      assigned_technician : "Técnico responsable",
      no_selected_machine : "Debe seleccionar al menos una máquina",
      delete_a_machine : "¿Se encuentra seguro de que desea eliminar la máquina seleccionada?",
      delete_machines : "¿Se encuentra seguro de que desea eliminar las máquinas seleccionadas?",
      delete_confirm_title : "Precaución",
      delete_confirm_confirm_button : "Confirmar borrado",
      delete_confirm_cancel_button : "Cancelar",
      update_machines : "Debes seleccionar una sola máquina"
    },

    login_panel : {
      title : "Iniciar sesión",
      registerMessage : "¿Aun no eres cliente?",
      registerLink : "Registrarse"
    },

    update_machine : {
      title : "Actualizar máquina",
      submitMessage: "Actualizar"
    },

    autocomplete : {
      placeholder : "Técnico"
    },

    navigation_bar : {
      register_button : "Regístrate",
      login_button : "Inicia sesión",
      my_machines : "Mis máquinas",
      technicians : "Técnicos",
      issues : "Incidencias",
      administration : "Administración",
      hello_logged : "Hola, ",
      logout : "Cerrar sesión"
    },

    signUp_panel : {
      user_placeholder : "Usuario",
      client_question : "¿Ya eres cliente?",
      init_session : "Iniciar sesión",
      modal_errorTitle : "Error en el servidor",
      modal_errorBody : "Ha ocurrido un error al realizar el registro. Inténtelo de nuevo en un momento."
    },

    update_user : {
      title : "Modificar perfil",
      modal_errorTitle : "Error en el servidor",
      modal_errorBody : "Ha ocurrido un error al actualizar los datos del usuario. Inténtelo de nuevo en un momento.",
      submitButton: "Modificar"
    }
  },
  technicians_panel : {
    title: "Añadir tecnico",
    sendButton: "Crear técnico"
  },

  model : {
    machineState : {
      ok : "Operativa",
      retirada : "Fuera de servicio",
      almacenada: "Almacenada"
    },
    machineType : {
      coffee : "Café",
      snacks : "Snacks",
      bebidas : "Bebidas",
      right : "Right"
    }
  }

};
