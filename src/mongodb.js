const { MongoClient } = require('mongodb');

    // Connection URL
  const url = 'mongodb://localhost:27017';
//   const url = 'mongodb+srv://admin:tech1234@avi.j3vc0.mongodb.net/?retryWrites=true&w=majority&appName=avi';
  const client = new MongoClient(url);
    
    // Database Name
  const dbName = 'node';
    
  async function main() {
      // Use connect method to connect to the server
      await client.connect();
      console.log('Connected successfully to server');
  
      const db = client.db(dbName);
      const collection = db.collection('sample');
    
      // the following code examples can be pasted here...

 // find in DB
 const findResult = await collection.find({type:"suv"}).toArray();
 console.log('Found documents =>', findResult);
        
      
    
      return 'done';
  }
    
  main().then(console.log).catch(console.error).finally(() => client.close()); 
  