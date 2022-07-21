import React from 'react'

export default function CastCard({castData}) {

  const getCharacterName = (originalCharacterList) =>{
    const splittedCharactersList = originalCharacterList&&originalCharacterList.split(' / ');
    const oneCharacter = (splittedCharactersList&&splittedCharactersList.length>0&&splittedCharactersList[0])||null

    return oneCharacter;
  }

  return (
    <div className="cast-card">
      {
        castData.profile_path&&
      <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${castData.profile_path}`}/>||
      <div className='cast-card-img-container'>
      <img className="cast-card-default-img" src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`}/>
      </div>
      }
      <div className='cast-info'>
      <h4>{castData.name}</h4>
      <p>{getCharacterName(castData.character)}</p>
      <p className="episodes">10 Episodes</p>
</div>
    </div>
  )
}

