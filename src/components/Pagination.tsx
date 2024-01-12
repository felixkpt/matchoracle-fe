import React from 'react';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import Select from 'react-select';
import Loader from './Loader';

interface PaginationProps {
  items: any;
  setPage: (value: string) => void
  setPerPage: (value: string) => void
  hidePerPage?: boolean
  loading?: boolean
}

const Pagination: React.FC<PaginationProps> = ({ items, setPage, setPerPage, hidePerPage, loading }) => {
  if (!items) return null;

  const { current_page, last_page, path, per_page } = items;

  const startPage = Math.max(current_page - 2, 1);
  const endPage = Math.min(startPage + 4, last_page);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const baseUrl = '';

  const handlePerPageChange = async (e: any) => {

    const value = e?.value || e?.target.value || undefined;
    console.log(value)
    setPerPage(value)
  };

  const handlePageClick = (data: any) => {
    const selectedPage = data.selected + 1;
    setPage(selectedPage.toString());
  };

  const options = [
    { value: 20, label: '20 per page' },
    { value: 50, label: '50 per page' },
    { value: 100, label: '100 per page' },
    { value: 200, label: '200 per page' },
    { value: 500, label: '500 per page' },
  ]

  return (
    <div className='d-flex w-100 flex-column justify-content-center gap-3 mt-5'>
      <div className='col-12'>{loading && <Loader />}</div>
      <div className='col-12'>
        <div className='row justify-content-center align-items-baseline'>
          <nav className='col-8 overflow-auto'>
            <ReactPaginate
              previousLabel={<Icon icon={'mingcute:arrows-left-line'} />}
              nextLabel={<Icon icon={'mingcute:arrows-right-line'} />}
              breakLabel={'...'}
              breakClassName={'px-1'}
              pageCount={last_page}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={''}
              activeClassName={'active'}
            />
          </nav>
          {
            !hidePerPage
            &&
            <div className="col-md-4 justify-content-end" style={{ maxWidth: '250px' }}>
              <Select
                key={0}
                className="form-control d-flex justify-content-center"
                classNamePrefix="select"
                placeholder="Select per page"
                defaultValue={per_page ? options.find(v => v.value == per_page) : options[1]}
                options={options}
                onChange={(v) => handlePerPageChange(v)}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Pagination;
