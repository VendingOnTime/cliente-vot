export const es_locales = {

  component : {

    add_machine : {
      title : "Añadir máquina",
      required : "Se requiere el campo",
      incorrectPositionLength : "Localización solo puede tener más 140 carácteres",
      incorrectPositionFormat : "Localización no puede contener carácteres especiales",
      incorrectDescriptionMinLength : "Localización debe tener más 2 carácteres",
      technicianError : "Es requerido que la administre alguien",
      incorrectDescriptionLength : "La descripción es demasiado larga",
      incorrectDescriptionFormat : "Descripción no puede contener carácteres especiales"
    },

    list_machine : {
      title : "Mis Máquinas",
      numSelections_1 : " ha sido seleccionada",
      numSelections_more_than_1 : " han sido seleccionadas",
      modify : "Modificar",
      setTechnician : "Asignar Técnico",
      createIssue : "Crear incidencia",
      delete_machine : "Eliminar",
      add_machine : "Añadir maquina",
      state : "Estado",
      location : "Ubicación",
      last_update : "Última actualización",
      assigned_technician : "Técnico responsable"
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
      hello_logged : "Hola, "
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
      init_session : "Iniciar sesión"
    }
  },

  model : {
    machineState : {
      ok : "OK",
      retirada : "Retirada"
    },
    machineType : {
      up : "Up",
      down : "Down",
      left : "Left",
      right : "Right"
    }
  }

};
