import React from 'react';
import ReactPaginate from 'react-paginate';

const BasePagination = ({pageCount=10,current=0,onChange = (page) => console.log(page)}) => {
    return (<>
            {(pageCount > 0) && <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={current}
            />}
        </>
    );
};

export default BasePagination;
