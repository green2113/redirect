import React from 'react';
import { Helmet } from 'react-helmet';

function Error() {
    return (
        <div>
            <Helmet>
                <title>Error Page</title>
            </Helmet>
            <div>
                <div>
                    <p>해당 주소는 아직 없거나 생성되지 않았습니다.</p>
                </div>
            </div>
        </div>
    )
}

export default Error;