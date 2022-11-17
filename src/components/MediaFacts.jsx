import React, { useEffect, useReducer } from 'react';
import { GetMovieKeywords, GetTvShowKeywords } from '../Services';
import { ImagesPathEnum, IconsEnums } from '../Enums';

export function MediaFacts({ mediaData, mediaType }) {
  const reducer = (state, action) => {
    return { ...state, [action.id]: action.value };
  };

  const initialState = {
    productionCompanies: [],
    type: '-',
    status: '-',
    originalName: '-',
    originalLanguage: '-',
    mediaKeywords: [],
    homePageLink: '',
  };
  const [state, setState] = useReducer(reducer, initialState);

  const getMediaKeywords = async () => {
    const response =
      mediaType === 'movie'
        ? await GetMovieKeywords(mediaData.id)
        : await GetTvShowKeywords(mediaData.id);

    if (!(response && response.status && response.status !== 200)) {
      setState({
        id: 'mediaKeywords',
        value: response.results,
      });
    }
  };

  useEffect(() => {
    if (mediaData) getMediaKeywords();
  }, [mediaData]);

  useEffect(() => {
    setState({
      id: 'productionCompanies',
      value: mediaData?.production_companies || [],
    });
    setState({
      id: 'type',
      value: mediaData?.type || '-',
    });
    setState({
      id: 'status',
      value: mediaData?.status || '-',
    });
    setState({
      id: 'originalName',
      value: mediaData?.original_name || '-',
    });
    setState({
      id: 'originalLanguage',
      value: mediaData?.original_language || '-',
    });
    setState({
      id: 'homePageLink',
      value: mediaData?.homepage || '#',
    });
  }, [mediaData]);
  return (
    <div className='info-column'>
      <div className='links-icons'>
        {/* <div>
  <img src={IconsEnums.facebook.Img}/>
  <img src={IconsEnums.twitter.Img}/>
  <img src={IconsEnums.insta.Img}/>
  </div>
*/}
        <span />
        <a href={state.homePageLink} target='_blank'>
          <img src={IconsEnums.link.Img} />
        </a>
        <span />
      </div>

      <div className='facts'>
        <h2>Facts</h2>
        <div className='fact-block'>
          <h3>Original Name</h3>
          <bdi>{state.originalName}</bdi>
        </div>

        <div className='fact-block'>
          <h3>Status</h3>
          <p>{state.status}</p>
        </div>

        {/* series facts */}
        <div className='fact-block'>
          <h3>Network</h3>
          <div className='network-img'>
            {state.productionCompanies &&
              state.productionCompanies.map((item) =>
                item.logo_path ? (
                  <img src={`${ImagesPathEnum.logo.h30.value}/${item.logo_path}`} />
                ) : null
              )}
          </div>
        </div>

        {/* series facts */}
        <div className='fact-block'>
          <h3>Type</h3>
          <p>{state.type}</p>
        </div>

        <div className='fact-block'>
          <h3>Original Language</h3>
          <p>{state.originalLanguage}</p>
        </div>

        {/* movie fact */}
        <div className='fact-block'>
          <h3>Budget</h3>
          <p>$880,166,924.00</p>
        </div>

        {/* movie fact */}
        <div className='fact-block'>
          <h3>Revenue</h3>
          <p>-</p>
        </div>
      </div>

      <div className='keywords'>
        <h2>Keywords</h2>
        {state.mediaKeywords &&
          state.mediaKeywords.map((item) => (
            <div>
              <span>{item.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
