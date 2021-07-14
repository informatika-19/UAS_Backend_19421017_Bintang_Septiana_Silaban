const bungaModel = require('../model/bunga')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
const bunga = require('../model/bunga')

exports.insertBunga = (data) =>
  new Promise((resolve, reject) => {
    bungaModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Data')))
    .catch(() => reject(requestResponse.serverError))
})

exports.tampilkansemuabunga = () =>
  new Promise((resolve, reject) => {
    bungaModel.find({})
      .then(bunga => resolve(requestResponse.suksesWithData(bunga)))
      .catch(error => reject(requestResponse.serverError))
  })

exports.getbyId = (id) =>
  new Promise((resolve, reject) => {
    bungaModel.findOne({
      _id: objectId(id)
    }).then(bunga => resolve(requestResponse.suksesWithData(bunga)))
    .catch(error => reject(requestResponse.serverError))
  })

  exports.edit = (data, id, changeImage) =>
    new Promise((resolve, reject) => {
      bungaModel.updateOne({
        _id: objectId(id)
      }, data)
        .then(() => {
          if (changeImage) {
            deleteImage(data.oldImage)
          }
          resolve(requestResponse.sukses('Berhasil Edit Data'))
        }).catch(() => reject(requestResponse.serverError))
    })

  exports.delete = (id) =>
    new Promise((resolve, reject) => {
      bungaModel.findOne({
        _id: objectId(id)
      }).then(bunga => {
        bungaModel.deleteOne({
          _id: objectId(id)
        }).then(() => {
          deleteImage(bunga.image)
          resolve(requestResponse.sukses('Berhasil Delete Data '))
        }).catch(()=> reject(requestResponse.serverError))
      })
    })