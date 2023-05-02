export interface OrderProductI {
    qty: number,
    product: {
      id?: number,
      name: string,
      price: number,
      image: string,
      type: string,
      dateEntry: string,
    };
}
