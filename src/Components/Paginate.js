// import React from 'react';
// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

// function Paginate({ pages, page, keyword = '', isAdmin = false }) {
//     if (keyword) {
//         keyword = keyword.split('?keyword=')[1].split('&')[0];
//     }

//     return (pages > 1 && (
//         <Pagination>
//             {[...Array(pages).keys()].map((x) => (

//                 <LinkContainer
//                 key={x+1}
//                    to={
//                         !isAdmin ?
//                         `/?keyword=${keyword}&page=${x+1}`:
//                         `/admin/productlist/?keyword=${keyword}&page=${x+1}`
//                     }
//                 >
                    

//                     <Pagination.Item  active={x+ 1 === page}>
//                         {x+1}
//                     </Pagination.Item>
//                 </LinkContainer>
//             ))}
//         </Pagination>
//     ));
// }

// export default Paginate;

import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    let queryString = '';
    if (keyword) {
        const params = new URLSearchParams(keyword);
        const keywordValue = params.get('keyword') || '';
        queryString = `?keyword=${keywordValue}`;
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (

                    <LinkContainer
                    key={x + 1}
                    to={!isAdmin
                        ? { pathname: '/', search: `${queryString}&page=${x + 1}` }
                        : { pathname: '/admin/productlist/', search: `${queryString}&page=${x + 1}` }
                    }
                >
                    <Pagination.Item active={x + 1 === page}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>

                ))}
            </Pagination>
        )
    );
}

export default Paginate;

