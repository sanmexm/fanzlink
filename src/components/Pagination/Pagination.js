import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';

import './pagination.css'

const Paginate = ({ page, pageName, actionGet, numberOfPages, totalNumber }) => {
  const dispatch = useDispatch()

    useEffect(() => {
      if(page) dispatch(actionGet(page))
    }, [page, actionGet, dispatch])
    
  return (
    <div className="main-pagination">
      <Stack spacing={2}>
        <Pagination 
          count={numberOfPages}
          variant="outlined" 
          shape="rounded"
          color='primary'
          renderItem={(item) => (
            <PaginationItem { ...item } component={Link} to={`/${pageName}?page=${item.page}`} />
            )}
        />
        <span>{totalNumber} results found</span>
      </Stack>
    </div>
  )
}

export default Paginate