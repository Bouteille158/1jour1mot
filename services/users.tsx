import { connectSurreal, db } from "../surrealdb";

export async function getUser(uid: string): Promise<User> {
  // console.log("Getting user from SurrealDB");
  // console.log("Input uid : " + uid);
  let user: User = {
    uid: uid,
    id: "",
    name: "",
  };

  const accountDetails: AccountDetails = await connectSurreal().then(
    async () => {
      // console.log("Quering SurrealDB for account:" + uid);
      const res = await db.select("account:" + uid);
      // console.log("accountDetails res : ");
      // console.log(res);
      // console.log(typeof res);

      if (
        (res[0] as AccountDetails).created_at &&
        (res[0] as AccountDetails).id &&
        (res[0] as AccountDetails).name
      ) {
        // console.log("Type checked");
        // console.log(typeof res[0]);
        // console.log(res[0]);
        const accountDetails: AccountDetails = JSON.parse(
          JSON.stringify(res[0])
        );
        console.log("Account details : ");
        console.log(accountDetails);
        return accountDetails;
      } else {
        throw new Error("Invalid response type");
      }
    }
  );

  user.id = accountDetails.id;
  user.name = accountDetails.name;
  user.profilePicture = accountDetails.profilePicture;

  console.log("Got user from SurrealDB");
  return user;
}

export async function createUser(user: User): Promise<void> {
  console.log("Creating user in SurrealDB");
  console.log("Input user data : " + JSON.stringify(user));
  await connectSurreal().then(async () => {
    console.log("Quering SurrealDB for account:" + user.uid);
    const res = await db.create("account:" + user.uid, {
      name: user.name,
      created_at: new Date().toISOString(),
    });
    console.log("Create user response : " + JSON.stringify(res));
  });
}

export async function updateUser(user: User): Promise<void> {
  console.log("Updating user in SurrealDB");
  console.log("Input user data : " + JSON.stringify(user));
  await connectSurreal().then(async () => {
    console.log("Quering SurrealDB for " + user.id);
    const res = await db.change(user.id, {
      name: user.name,
      profilePicture: user.profilePicture,
      updated_at: new Date().toISOString(),
    });
    console.log("Update user response : " + JSON.stringify(res));
  });
}

export type User = {
  id: string;
  uid: string;
  name: string;
  profilePicture?: string;
};

export type AccountDetails = {
  created_at: string;
  updated_at?: string;
  id: string;
  name: string;
  profilePicture?: string;
};
