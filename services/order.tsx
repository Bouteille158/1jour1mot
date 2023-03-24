import { fireDB } from "../firebase";
import { ShoeInCart } from "../redux";

export async function getOrders(userID: string): Promise<Array<Order>> {
  let orderList: Array<Order> = [];

  const orders = await fireDB
    .collection("orders")
    .where("userID", "==", userID)
    .get();

  orders.forEach((doc) => {
    // console.log(doc.data());
    // console.log(doc.id);
    const stringValue = JSON.stringify(doc.data());
    let value: Order = JSON.parse(stringValue);
    value.id = doc.id;
    orderList.push(value);
  });
  console.log("Orders list : ", orderList);
  return orderList;
}

export function createOrder(order: Order): void {
  fireDB
    .collection("orders")
    .add(order)
    .then(() => {
      console.log("Order created");
    })
    .catch(() => {
      console.log("Error order creation");
    });
  return;
}

export async function updateOrderStatus(status: string, orderID: string) {
  if (status) {
    fireDB
      .collection("orders")
      .doc(orderID)
      .update({ status: status })
      .catch((err) => {
        console.error(err);
      });
    console.log("Updated order ", orderID, " with status ", status);
  } else {
    console.error("Status is empty");
  }
}

export function getOrderTotalPrice(order: Order) {
  let totalPrice = 0;
  order.items.forEach((item) => {
    totalPrice += item.price * (1 - item.promo / 100) * item.quantity;
  });
  return totalPrice;
}

export function getItemCount(order: Order) {
  let itemCount = 0;
  order.items.forEach((item) => {
    itemCount += item.quantity;
  });
  return itemCount;
}

export type Order = {
  id?: string;
  items: ShoeInCart[];
  userID: string;
  deliveryAddress: string;
  status: string;
};
