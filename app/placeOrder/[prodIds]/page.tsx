interface Props {
	params: {
		prodIds: string;
	}
}

const PlaceOrder = ({ params }: Props) => {
	return (
		<div>
			<h1>{params.prodIds}</h1>
		</div>
	);
};

export default PlaceOrder;