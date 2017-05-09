export const es_locales = {
  forms : {
    placeholder : {

    },
    error: {
      required : "Se requiere el campo",

      incorrectPositionLength : "Localización solo puede tener más 140 carácteres",
      incorrectPositionFormat : "Localización no puede contener carácteres especiales",

      incorrectDescriptionMinLength : "Localización debe tener más 2 carácteres",
      incorrectDescriptionLength : "La descripción es demasiado larga",
      incorrectDescriptionFormat : "Descripción no puede contener carácteres especiales",

      technicianError : "Es requerido que la administre alguien",
    }
  },
  component : {
    // TODO Hacer seccion para errores de formularios (Los campos se repiten en muchos formularios)

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
      username_input_placeholder : "Usuario/Email",
      required_user : "Ha de introducirse un nombre de usuario o email",
      password : "Contraseña",
      login_error : "La combinación de usuario y contraseña introducida es incorrecta",
      registerMessage : "¿Aun no eres cliente?",
      registerLink : "Registrarse"
    },

    update_machine : {
      title : "Actualizar máquina",
      position_placeholder : "Ubicación",
      required : "Se requiere el campo",
      incorrectPositionLength : "La localización no puede tener más de 140 carácteres",
      incorrectPositionFormat : "La localización no puede contener carácteres especiales",
      incorrectDescriptionMinLength : "La localización debe tener más de 2 carácteres",
      technicianError : "Se requiere que la administre alguien",
      description_placeholder : "Descripción",
      incorrectDescriptionLength : "La descripción es demasiado larga",
      incorrectDescriptionFormat : "La descripción no puede contener carácteres especiales"
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
      required_user : "Ha de introducirse un nombre de usuario",
      short_username : "El nombre de usuario es demasiado corto",
      large_username : "El nombre de usuario es demasiado largo",
      format_username : "El nombre de usuario no puede contener caracteres especiales",
      email_placeholder : "Email",
      required_email : "Ha de introducirse un email",
      format_email : "El formato del email no está admitido",
      password_placeholder : "Contraseña",
      required_password : "Es necesario introducir una contraseña",
      format_password : "La contraseña no es lo suficientemente segura",
      confirm_password_placeholder : "Confirmar contraseña",
      equal_passwords : "La contraseña introducida es diferente",
      client_question : "¿Ya eres cliente?",
      init_session : "Iniciar sesión",
      modal_errorTitle : "Error en el servidor",
      modal_errorBody : "Ha ocurrido un error al realizar el registro. Inténtelo de nuevo en un momento."
    },

    update_user : {
      title : "Modificar perfil",
      email_placeholder : "Cambiar email",
      required_email : "Ha de introducirse un email",
      incorrect_email : "El formato del email no está admitido",
      password_placeholder : "Contraseña",
      required_password : "Es necesario introducir una contraseña",
      incorrect_password : "La contraseña no es lo suficientemente segura",
      modal_errorTitle : "Error en el servidor",
      modal_errorBody : "Ha ocurrido un error al actualizar los datos del usuario. Inténtelo de nuevo en un momento.",
      new_password_placeholder : "Nueva contraseña",
      new_password_required : "Es necesario introducir una contraseña",
      new_password_incorrect : "La contraseña no es lo suficientemente segura",
      confirm_password_placeholder : "Confirmar contraseña",
      equal_password_error : "La contraseña introducida es diferente"
    }
  },
  technicians_panel : {
    required_email : "Ha de introducirse un email",
    incorrect_email: "El formato del email no está admitido",
    required_username: "Ha de introducirse un numbre de usuario",
    required_dni: "Ha de introducirse un dni",
    required_name: "Ha de introducirse un nombre",
    required_surname: "Ha de introducirse un apellido",
    short_username : "El nombre de usuario es demasiado corto",
    large_username : "El nombre de usuario es demasiado largo",
    format_username : "El nombre de usuario no puede contener caracteres especiales",
    format_email : "El formato del email no está admitido"
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
