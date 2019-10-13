'use strict'

const AWS = require('aws-sdk')
const docDynamo = new AWS.DynamoDB.DocumentClient()

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
}

/**
 * Servicio que elimina un cliente
 */
module.exports.remove = async (event, context) => {
  try {
    let clienteRq = JSON.parse(event.body)
    let params = {
      TableName: 'nequi-cliente',
      Key: { id: `${clienteRq.idTipo}-${clienteRq.idNumero}`},
    }
    await deleteItem(params)
    return sendResponse(200,  { message: "Eliminado Correctamente" }, headers)
  }
  catch (e) {
    console.error(e)
    return sendResponse(500, { message: `Internal server error: ${e}` }, headers)
  }
}

const deleteItem = (params) => {
  return docDynamo.delete(params).promise()
}

// metodos de respuesta
const sendResponse = (statusCode, body, headers = '') => {
  const response = {
    statusCode: statusCode,
    headers: headers,
    body: JSON.stringify(body)
  }
  return response
}
