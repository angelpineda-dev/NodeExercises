const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({
      msg: "No hay archivos por subir",
    });
  }

  try {
    const nombre = await subirArchivo(req.files);

    res.json({
      nombre,
    });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

module.exports = {
  cargarArchivo,
};
