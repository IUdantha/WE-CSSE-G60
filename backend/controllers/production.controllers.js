const Production = require('../models/production.models')

async function getProductions (req, res) {
  Production.find({}, (err, productions) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(productions)
    }
  })
}

// function to get a single product
async function getProduction (req, res) {
  try {
    const product = await Production.findById(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function storeProduction (req, res) {
  const production = new Production(req.body)
  production.save((err) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(201).send(production)
    }
  })
}

async function updateProduction (req, res) {
  Production.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, production) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(production)
    }
  })
}

// const updateProduction = async (req, res, next) => {
//   const id = req.params.id;
//   const {
//     batchNumber,
//     productName,
//     quantityProduced,
//     productionDate,
//     expirationDate,
//     salesPrice,
//     productionCost,
//   } = req.body;

//   let production;

//   try {
//     production = await Production.findByIdAndUpdate(id, {
//       batchNumber,
//       productName,
//       quantityProduced,
//       productionDate,
//       expirationDate,
//       salesPrice,
//       productionCost,
//     });
//     production = await production.save();
//   } catch (err) {
//     console.log(err);
//   }

//   if (!production) {
//     return res
//       .status(400)
//       .json({ message: "Unable to Update product Details." });
//   }

//   return res.status(200).json({ production });
// };

async function deleteProduction (req, res) {
  Production.findByIdAndDelete(req.params.id, (err, production) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(production)
    }
  })
}

module.exports = {
  getProduction,
  getProductions,
  storeProduction,
  updateProduction,
  deleteProduction
}
