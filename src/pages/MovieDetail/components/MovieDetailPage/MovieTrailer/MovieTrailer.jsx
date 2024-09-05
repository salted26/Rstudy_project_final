import React from 'react';
import {Modal} from "react-bootstrap";
import YouTube, { YouTubeProps } from 'react-youtube';

const MovieTrailer = ({videoData, lgShow, setLgShow, i}) => {

    if(videoData?.length > 0) {
        return (
            <div>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {videoData[i]?.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {youtube(videoData[i]?.key)}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};

function youtube(key) {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const opts: YouTubeProps['opts'] = {
        height: '440',
        width: '760',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return <YouTube videoId={key} opts={opts} onReady={onPlayerReady} />;
}

export default MovieTrailer;