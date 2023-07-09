export interface Todo {
	id: number;
	todo: string;
	isDone: boolean;
}

export interface Product {
	id: number;
	name: string;
	price: number;
	serialNumber: string;
	location: string;
	quantity: number;
	image: string;
	isInCart?: boolean;
}
