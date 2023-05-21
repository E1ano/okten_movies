import React, {FC, ReactNode} from 'react';
import './Container.scss';
interface IProp {
    children: ReactNode
}

const Container:FC<IProp> = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    );
};

export default Container;