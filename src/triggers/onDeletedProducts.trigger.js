const { MongoClient } = require('mongodb');

async function moveDeletedProducts() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const mongod = new MongoMemoryServer();

  const uri = 'mongodb://127.0.0.1:27017/motomania'
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('motomania');
    const productosCollection = database.collection('productos');
    const eliminadosCollection = database.collection('productosEliminados');

    const changeStream = productosCollection.watch();

    changeStream.on('change', async (change) => {
      if (change.operationType === 'update' && change.updateDescription.updatedFields.eliminado === true) {
        const productId = change.documentKey._id;
        const deletedProduct = await productosCollection.findOneAndDelete({ _id: productId });
        await eliminadosCollection.insertOne(deletedProduct.value);
      }
    });
  } finally {
    // await client.close();
  }
}

module.exports = moveDeletedProducts;
