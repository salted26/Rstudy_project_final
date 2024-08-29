import './MovieCard.style.css'

const MovieCard = ({movie}) => {

    const image = `https://image.tmdb.org/t/p/w533_and_h300_bestv2${movie.poster_path}`;
    const url = "url(" + image + ")";

    return (
        <div className="movie-card" style={{backgroundImage: url}}>
            <div>{movie.title}</div>
            <div>{movie.adult === true ? "19세 미만 관람 불가" : "전체이용가"}</div>
        </div>
    );
};

export default MovieCard;
