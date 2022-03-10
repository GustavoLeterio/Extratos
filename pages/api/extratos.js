// import { connectToDataBase } from "../../utils/mongodb"

// export default async function handler(req, res) {
//   const { method } = req;
//   const { db } = await connectToDataBase();
//   const data = await db.collection('user');

//   switch (method) {
//     case 'GET':
//       //Requesting
//       const getResponse = await data.find().toArray();
//       res.status(200).json(getResponse);
//       break;

//     case 'POST':
//       //Adding new Object
//       const body = JSON.parse(req.body);

//       console.log(body);
//       if (validate(body.transactionType, "Transaction", res) && validate(body.value, "Value", res) && validate(body.title, "Title", res)) {
//         const postResponse = await data.insertOne(body);
//         res.status(200).json("Sended");
//         return;
//       }
//       break;
//     case 'DELETE':
//       //Delete Object
//       break;
//     case 'PUT':
//       //Update Object
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//       break;
//   }
// }

// function validate(bodyFragment, fragmentName, res) {
//   if (!bodyFragment)
//     res.status(400).json({ message: 'Missing ' + fragmentName });
//   else
//     return true;
// }