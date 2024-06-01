import Image from 'next/image';
import React from 'react'

import loader from "../../public/loader.gif"

const Index = () => (
    <div id="loading">
        <div id="loading-center">
            <Image src={loader} alt="loader" />
        </div>
    </div>
);

export default Index;
