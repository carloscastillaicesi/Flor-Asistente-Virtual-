const User = require('../../Models/userModel');
const userLocal = require('../UserLocalCRUD');

saludo = (processed, fn) => {
  var data = userLocal.dataObject(processed.number);
  if (data === processed.number) {
    var user = new User({
      _id: data,
      step: 1,
      stage: fn
    })
    user.save().then((result) => {
      var localUser = userLocal.createUser(result._id, result.step, result.stage)
      console.log(`Local User = ${localUser} & Mongo User : ${result._id} `)
    }).catch((err) => console.log(err.message))
  } else {
    let target = {
      "answer": "¡Hola! Ya he guardado tu número, pero no tengo tu nombre. Me lo podrías decir, porfavor",
    };
    Object.assign(processed, target);
  }
  return processed;
};

nombre = (processed, fn) => {
  var data = userLocal.dataObject(processed.number);
  User.findOneAndUpdate(data.id, { step: 2, stage: fn, name: 'Daniel Manso' },
    function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated User : ", docs);
        var localUser = userLocal.updateData(data.id, docs.step, docs.stage, docs.name)
        console.log(`Local User = ${localUser} & Mongo User : ${docs._id} `)
      }
    });
  return processed;
  // let target = {
  //   "answer": "¡Hola! Ya he guardado tu número, pero no tengo tu nombre. Me lo podrías decir, porfavor",
  // };
  // Object.assign(processed, target);
}




foto = (processed) => {

};


edad = (processed) => {

};

ubicacion = (processed) => {

};


tieneHuerta = (processed) => {

};

despedida = (processed) => {

};

mapa = (processed) => {

};


none = (processed) => {



  return processed;
};



intentClassifier = (fun) => {

  var fn = fun.intent.toString().trim().toLowerCase();

  // function exists
  if (fn in global && typeof global[fn] === "function") {
    return global[fn](fun, fn);
  }

  // function does not exist
  else {
    console.log("could not find " + fn + " function");
  }
};

module.exports = {
  intentClassifier,
  foto,
  saludo,
  nombre,
  foto,
  edad,
  ubicacion,
  tieneHuerta,
  despedida,
  mapa
};  