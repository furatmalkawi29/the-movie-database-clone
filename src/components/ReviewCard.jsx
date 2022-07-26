import React from 'react'
import star from '../assets/images/star.svg'
import moment from 'moment';
import {ImagesPathEnum} from '../Enums'

export default function ReviewCard({
  data
}) {



  return (
    <div className="review-card">
      <div className="author">
        <img className="author-avatar" src="https://www.themoviedb.org/t/p/w64_and_h64_face/hlNmfiWN5ytcfvsonoteiDC90ua.jpg" alt=""/>

        <div className="author-info">
          <div>
            <p>A review by {data?.author}</p>
            <div className="star-rate">
              <img src={star} alt=""/>
              <span>{data&&data.author_details&&data.author_details.rating}</span></div>
          </div>
          <p className="review-date">Written by <span>{data?.author}</span> on {data?.created_at&&moment(data?.created_at).format('LL')}</p>
        </div>
      </div>

      <div className="review-body">
        {<p>{data?.content}</p>}
      </div>
    </div>
  )
}
