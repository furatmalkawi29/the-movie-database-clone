import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  BottomMenu, MovieDetailsHeader, MediaFacts,
  TopMenu, CastCard, RecommendationCard, ReviewCard
} from "../components";
import {ImagesPathEnum, AssetImagesEnums, IconsEnums} from '../Enums';
import { useParams, useNavigate } from "react-router-dom";
import {
  GetMovieCredits,GetTvShowCredits,GetMovieImages,
  GetMovieVideos, GetMovieRecommendations, GetMovieReviews,
  GetTvShowImages, GetTvShowVideos, GetTvShowRecommendations,
  GetTvShowReviews, GetMovieDetails, GetTvShowDetails,
} from "../Services";

export const MovieDetailsPage = () => {
  const { id, mediaType } = useParams();
  const navigate = useNavigate();

  //TODO::convert to state + reducer 

//TODO:: mobile side menu not showing 
  
  const [mediaData, setmediaData] = useState(null);
  const [mediaCast, setMediaCast] = useState([]);
  const [movieReviews, setMediaReviews] = useState([]);
  const [movieMediaImages, setMovieMediaImages] = useState([]);
  const [mediaVideo, setMediaVideo] = useState(null);
  const [mediaRecommendations, setMediaRecommendations] = useState([]);

  const getMediaCredits = async () => {
    const response =
      mediaType === "movie"
        ? await GetMovieCredits(id)
        : await GetTvShowCredits(id);

    if (!(response && response.status && response.status !== 200)) {
      setMediaCast((response && response.cast) || []);
    }
  };

  const getMediaImages = async () => {
    const response =
      mediaType === "movie"
        ? await GetMovieImages(id)
        : await GetTvShowImages(id);

    if (!(response && response.status && response.status !== 200)) {
      setMovieMediaImages((response && response.posters) || []);
    }
  };

  const getMediaVideos = async () => {
    const response =
      mediaType === "movie"
        ? await GetMovieVideos(id)
        : await GetTvShowVideos(id);

    if (!(response && response.status && response.status !== 200)) {
      setMediaVideo((response && response.results && response.results.length > 0 && response.results[0]) || null);
    }
  };

  const getMediaRecommendations = async () => {
    const response =
      mediaType === "movie"
        ? await GetMovieRecommendations(id)
        : await GetTvShowRecommendations(id);

    if (!(response && response.status && response.status !== 200)) {
      setMediaRecommendations((response && response.results && response.results.length > 0 && response.results) || null);
    }
  };

  const getMediaReviews = async () => {
    const response =
      mediaType === "movie"
        ? await GetMovieReviews(id)
        : await GetTvShowReviews(id);

    if (!(response && response.status && response.status !== 200)) {
      setMediaReviews(response.results || []);
    }
  };

  const getMediaDetails = useCallback(async () => {
    const response =
      mediaType === "movie"
        ? await GetMovieDetails(id)
        : await GetTvShowDetails(id);

    if (
      !(
        response &&
        response.status &&
        response.status !== 200 &&
        typeof response.status === "number"
      )
    ) {
      setmediaData(response || {});
    }
  });

  useEffect(() => {
    navigate(`/${mediaType}/${id}`);
    getMediaDetails();
  }, [id]);

  useEffect(() => {
    getMediaCredits();
    getMediaImages();
    getMediaVideos();
    getMediaRecommendations();
    getMediaReviews();
  }, [mediaData]);

  return (
    <>
      <TopMenu />
      <MovieDetailsHeader 
        mediaId={id}
        mediaType={mediaType}
        mediaData={mediaData} />
      <section className="info-content">
        <div>
          <section className="cards-wrapper">
            <h3>Series Cast</h3>
            {/* <h3>Top Billed Cast</h3> */}
            <div className="cast-cards-container">
              {mediaCast &&
                mediaCast.map((item) => <CastCard castData={item} />)}
              <div className="view-more">
                <span>View More</span>
                <img src={AssetImagesEnums.rightArrow.Img} />
              </div>
            </div>
          </section>

          <section className="cards-wrapper">
            <div className="wrapper-top">
              <h3>Social</h3>
              <div className="tabs-menu">
                <div className="active-tab-underline">
                  <p>Reviews</p>
                  <span>{movieReviews && movieReviews.length}</span>
                </div>
                <div>
                  <p> Discussions</p>
                  <span></span>
                </div>
              </div>
            </div>
            <div>
              {(movieReviews && movieReviews.length > 0 && (
                <>
                  <ReviewCard
                    data={movieReviews.find((item) => item)}
                  />
                  <p className="wrapper-link">Read All Reviews</p>
                </>
              )) || (
                  <p>{`We don't have any reviews for ${mediaData?.name || mediaData?.title
                    }.`}</p>
                )}
            </div>
          </section>

          <section className="cards-wrapper">
            <div className="wrapper-top">
              <h3>Media</h3>
              <div className="tabs-menu">
                <div className="active-tab-underline">
                  <p>Most Popular</p>
                </div>
                <div>
                  <p>Videos</p>
                  <span></span>
                </div>
                <div>
                  <p>Backdrops</p>
                  <span></span>
                </div>
                <div>
                  <p>Posters</p>
                  <span>{movieMediaImages && movieMediaImages.length}</span>
                </div>
              </div>
            </div>
            <div className="media-cards-container">
              {mediaVideo && mediaVideo.site === "YouTube" && (
                <div className="thumbnail">
                  <img
                    className="thumbnail-img"
                    src={`https://i.ytimg.com/vi/${mediaVideo.key}/sddefault.jpg`}
                    alt=""
                  />
                  <div className="thumbnail-btn">
                    <img src={IconsEnums.playIcon.Img} alt="play-button" />
                  </div>
                </div>
              )}
              {movieMediaImages &&
                movieMediaImages.map((item) => (
                  <img
                    className="media-img"
                    src={`${ImagesPathEnum.bestv2.w533_and_h300.value}/${item.file_path}`}
                    alt=""
                  />
                ))}
            </div>
          </section>

          <section className="cards-wrapper recommendation">
            <h3>Recommendations</h3>
            <div className="cast-cards-container">
              {(mediaRecommendations &&
                mediaRecommendations.map((item) => (
                  <RecommendationCard data={item} />
                ))) || (
                  <p>
                    We don't have enough data to suggest any TV shows based on
                    People Puzzler. You can help by rating TV shows you've seen.
                  </p>
                )}
            </div>
          </section>
        </div>
        <div>
          <MediaFacts
            mediaData={mediaData}
            mediaType={mediaType}
          />
        </div>
      </section>
      <BottomMenu 
      mediaId={id}
      mediaType={mediaType}
      />
    </>
  );
}
