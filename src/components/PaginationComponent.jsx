import React, { useEffect, useState } from 'react';

export const PaginationComponent = ({ numberOfPages, setActivePage, activePage }) => {

  const [pagesItems, setPagesItems] = useState([]);


  const createPaginationItems = () => {
    const localPagesItems = [];
    for (let index = 1; index <= numberOfPages; index++) {
      localPagesItems.push({
        page: index,
        isActive: activePage == index,
      });
    }
    setPagesItems(localPagesItems);
  };

  const handleItemClick = (event) => {
    const currentPage = event.target.id;
    setActivePage(currentPage);
  };

  useEffect(() => {
    createPaginationItems();
  }, [activePage, numberOfPages]);


  return (
    <div className='pages-items-container'>
      {pagesItems.map((item) => (
        <div
          id={item.page}
          className={`page-item ${(item.isActive ? `active-page-item` : `inActive-page-item`)}`}
          onClick={handleItemClick}>
          {item.page}
        </div>
      ))}
    </div>
  );
};
