'use strict';

import React from 'react';

const Page = ({children}) => (
    <div className="page-component container">
        <div className="page-box">
            {children}
        </div>
    </div>
);

export default Page;