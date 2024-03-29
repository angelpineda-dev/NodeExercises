const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
  const { limit = 4, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limit))
      .populate("usuario", "nombre"),
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

// obtenerCategoria - populate {}

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.status(200).json({
    categoria,
  });
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe.`,
    });
  }

  // generar la data a guardar
  const data = {
    nombre,
    usuario: req.user._id,
  };

  const categoria = new Categoria(data);

  // Guardar en DB
  await categoria.save();

  res.status(201).json(categoria);
};

// actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  const nombre = data.nombre.toUpperCase();

  data.nombre = nombre;
  data.usuario = req.user._id;

  // Verificar que la categoria no exista para evitar duplicidad.
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(401).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe en la base de datos`,
    });
  }

  // Actualizar categoria
  const categoria = await Categoria.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  res.status(201).json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    {
      returnDocument: "after",
    }
  );

  res.status(200).json(categoria);
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
