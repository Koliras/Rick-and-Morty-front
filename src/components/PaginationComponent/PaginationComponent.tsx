import { useAppSelector } from "../../app/hooks";
import { Pagination, PaginationItem } from "@mui/material"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";

export default function PaginationComponent() {
  const { pageAmount } = useAppSelector(state => state.characters);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [paginationPage, setPaginationPage] = useState(page);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationPage(value);
  };

  useEffect(() => {
    setSearchParams((searchParams: URLSearchParams) => {
      return {
        ...searchParams,
        page: paginationPage,
      }
    })
  }, [paginationPage])

  useEffect(() => {
    setPaginationPage(page);
  }, [page])
  return (
    <Pagination
      count={pageAmount}
      shape='rounded'
      variant='outlined'
      page={paginationPage}
      onChange={handleChange}
      sx={{
        mb: '12px',
        mt: '26px',
      }}
      renderItem={(item) => {
        if (item.page === paginationPage) {
          return (
            <PaginationItem
              sx={{
                color: '#F5F5F5',
                bgcolor: '#F5F5F5',
                ":disabled": {
                  bgcolor: '#9E9E9E'
                },
              }}
              {...item}
            />
          )
        }
        switch (item.type) {
          case 'next':
          case 'previous': {
            return (
              <PaginationItem
                sx={{
                  color: '#3C3E44',
                  bgcolor: '#F5F5F5',
                  ":disabled": {
                    bgcolor: '#9E9E9E'
                  },
                  ':hover': {
                    bgcolor: '#D5D5D5',
                  }
                }}
                {...item}
              />
            )
          }
          default: {
            return  (
              <PaginationItem
                sx={{
                  color: '#F5F5F5',
                  bgcolor: '#3C3E44',
                  ":disabled": {
                    bgcolor: '#9E9E9E'
                  },
                }}
                {...item}
              />
            )
          }
        }
      }}
    />
  )
}