export interface Todo {
	id: number;
	todo: string;
	isDone: boolean;
}

export interface Product {
	id: number;
	name: string;
	price: number;
	isInCart?: boolean;
}
