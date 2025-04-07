import React from 'react';
import Image from "../../../../../node_modules/next/image";


interface CardComponentProps {
	heading: string;
	imageSrc: any;
}

const CardComponent = ({ heading, imageSrc }:CardComponentProps) => (
	<div className="border-[#B5B5B5] border mx-auto card_White px-6 py-4 text-[18px] font-normal font-alata">
		<h3 className="text-[18px] font-normal mb-4">{heading}</h3>
		<div className="flex justify-center">
			<Image src={imageSrc} alt="Card Image" height={60}  />
		</div>
	</div>
);

export default CardComponent;
