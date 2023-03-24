import { fireDB } from "../firebase";

export async function getUser(uid: string): Promise<User> {
  let user: User = {
    uid: "",
    name: "",
    address: "",
  };

  const res = await fireDB.collection("user").where("uid", "==", uid).get();

  res.forEach((elem) => {
    // console.log(elem.data());
    const stringValue = JSON.stringify(elem.data());
    user = {
      ...JSON.parse(stringValue),
      id: elem.id,
    };
  });
  return user;
}

export function createUser(user: User): void {
  fireDB
    .collection("user")
    .add(user)
    .then(() => {
      console.log("User created");
    })
    .catch(() => {
      console.log("Error user creation");
    });
}

export type User = {
  id?: string;
  uid: string;
  name: string;
  address: string;
  profilePic?: string;
};
