export async function getShoes(): Promise<Array<Shoe> | any> {
  // return new Promise((resolve, reject) => {
  //   let shoesList: Array<Shoe> = [];
  //   fireDB.collection("shoes").onSnapshot((res) => {
  //     res.forEach((doc) => {
  //       // console.log(doc.data());
  //       // console.log(doc.id);
  //       const stringValue = JSON.stringify(doc.data());
  //       let value: Shoe = JSON.parse(stringValue);
  //       value.id = doc.id;
  //       shoesList.push(value);
  //     });
  //     console.log("Shoes list : ", shoesList);
  //     resolve(shoesList);
  //   });
  // });
  return new Promise(() => {});
}

export function createShoe(shoe: Shoe): void {
  // fireDB
  //   .collection("shoes")
  //   .add(shoe)
  //   .then(() => {
  //     console.log("Shoe created");
  //   })
  //   .catch(() => {
  //     console.log("Error shoe creation");
  //   });
}

export type Shoe = {
  id: string;
  name: string;
  img: string;
  price: number;
  brandID: string;
  promo: number;
};
