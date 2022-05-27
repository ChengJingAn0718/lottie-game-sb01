import React from 'react';
import "../stylesheets/styles.css";
import { prePathUrl } from '../components/CommonFunctions';
import { Player } from '@lottiefiles/react-lottie-player';


export default function Scene1({ nextFunc, _geo }) {

    return (
        <div className='aniObject'>
            {/* <div
                style={{
                    position: "fixed", width: _geo.width * 0.35,
                    left: _geo.width * 0.05 + _geo.left
                    , bottom: (_geo.height * 0.1 + _geo.top) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/sb_04_intro_bg/sb_04_intro_bg_02.svg"}
                />
            </div>

            <div
                style={{
                    position: "fixed", width: _geo.width * 0.2,
                    left: _geo.width * 0.65 + _geo.left
                    , bottom: (_geo.height * 0.6 + _geo.top) + "px",
                    pointerEvents: 'none',
                    userSelect: 'none'
                }}>
                <img draggable={false} width={"100%"}
                    src={prePathUrl() + "images/sb_04_intro_bg/sb_04_intro_bg_04.svg"}
                />
            </div> */}

            <div
            >
                <Player
                    keepLastFrame={true}

                    src={prePathUrl() + 'lottiefiles/main/sb_03_intro.json'}
                    style={{
                        position: 'fixed',
                        width: _geo.width * 0.5,
                        left: _geo.left + _geo.width * 0.25,
                        top: _geo.top + _geo.height * -0.4,
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
}
