import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '..'
import './ratePostDataResponse.css'

const RatePostDataResponse = ({responseData}) => {
    const dispatch                                    = useDispatch() 
    const {isLoading, actualRate, rateTotal, sumTotal} = useSelector((state) => state.postsLists)

  return (
    <>
        {responseData && (
            <>
            Response Data:
            {isLoading ? (
                <Loader />
            ) : sumTotal? (
                <div>
                    <pre>{rateTotal}, {sumTotal}, {actualRate}</pre>
                </div>
            ) : null}
            </>
        )}
    </>
  )
}

export default RatePostDataResponse