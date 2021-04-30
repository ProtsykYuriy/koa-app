import mongo from 'mongodb';
export let db;
export let users;
export let rooms;

export const connect = () => {
  const uri = 'mongodb://localhost:27017/users';
  //const uri = 'mongodb+srv://YuriyProtsyk:mt!MFzUq5-47ERw@cluster0.p1nda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  mongo.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (err, client) => {
      if (err) throw err;
      db = client.db('GrandBudapest');
      users = await db.createCollection('Users');
      rooms = await db.createCollection('Rooms');
    }
  );
};
