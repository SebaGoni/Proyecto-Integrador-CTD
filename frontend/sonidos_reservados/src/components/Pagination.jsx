import React from 'react';
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <PaginationStyle>
      <ul className='pagination'>
        <li className={currentPage === 1 ? 'page-item-disabled' : 'page-item'}>
          <button onClick={handlePrevClick} className='page-link'>
            <AiOutlineArrowLeft/>
          </button>
        </li>
        {pageNumbers.map(number => (
          <li
          key={number}
          >
          <button onClick={() => paginate(number)} className={number === currentPage ? 'page-item-active' : 'page-link'}>
              {number}
          </button>
          </li> 
        ))}
        <li className={currentPage === pageNumbers.length ? 'page-item disabled' : 'page-item'}>
          <button onClick={handleNextClick} className='page-link'>
            <AiOutlineArrowRight/>
          </button>
        </li>
      </ul>
    </PaginationStyle>
  );
};

export default Pagination;

const PaginationStyle = styled.div`
        margin: 25vh 2rem 2rem 2rem ;
       
        display: flex;
        justify-content: center;
        align-items: center;
        .pagination{
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          gap: 10px;
        }
        .page-link{
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          cursor: pointer;
          color: #3F51B5;
          background-color: white;
          border: none;
          width: 40px;
          height: 40px;
        }
        .page-item-active{
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          cursor: pointer;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          background-color: #3F51B5;
        }
    `