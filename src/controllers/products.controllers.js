import Product from "../models/product.js";

// Leer Todos los Productos
export const readAllProducts = (req, res) => {};

// Leer 1 producto
export const readOneProduct = (req, res) => {};

// Crear producto
export const createProduct = async (req, res) => {
  try {
    // 1- recibir el objeto que tengo que agregar a la BD
    console.log(req.body);
    // 2- validar los datos del objeto
    // 3- guardar el objeto en la BD
    // 4- enviar respuesta
  } catch (error) {
    console.log(error);
  }
};

// Editar producto
export const editProduct = (req, res) => {};

// Borrar producto
export const deleteProduct = (req, res) => {};
