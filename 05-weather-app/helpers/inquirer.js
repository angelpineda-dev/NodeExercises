const inquirer = require("inquirer");

require("colors");

/* app config */

const inquirerMenu = async () => {
  console.clear();
  console.log("========================".green);
  console.log("  Seleccione una opcion ".white);
  console.log("========================".green);

  const { opcion } = await inquirer.prompt(menuOpts);

  return opcion;
};

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green}  Historial`,
      },
      {
        value: 0,
        name: `${"0.".green}  Salir`,
      },
    ],
  },
];

const crearTarea = [
  {
    type: "input",
    name: "enter",
    message: `Presione ${"enter".green} para continuar`,
  },
];

const pausa = async () => {
  const pausa = await inquirer
    .prompt(crearTarea)
    .then((answer) => answer)
    .catch((err) => err);

  return pausa;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

/* app main actions */

const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: lugar.id,
      name: `${idx} ${lugar.placeName}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}. `.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(preguntas);

  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoChecklist,
};
