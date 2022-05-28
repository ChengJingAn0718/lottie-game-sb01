import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"
import { ShadowComponent } from '../../components/CommonComponent';

let timerList = []
let intervalList = []

let waitTime = 4000


export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const characterRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();
    const objectRef = useRef();


    useEffect(
        () => {

            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/j_b.mp3"
            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/j_g.mp3"

            return () => {

                intervalList.map(interval => clearInterval(interval))
                timerList.map(timer => clearTimeout(timer))

                audioList.bodyAudio1.pause()
                audioList.bodyAudio2.pause()
            }
        }, []
    )

    React.useImperativeHandle(ref, () => ({
        playGame: () => {

            timerList[0] = setTimeout(() => {
                audioList.bodyAudio1.play()
            }, 2000);
            timerList[1] = setTimeout(() => {
                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(-35%, -30%) scale(2)'

                timerList[2] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);
            }, 6000);

        },
    }))

    const BaseDiv = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    left : 0%;
    top : 0%;
  `

    return (
        <div className="aniObject"
        >

            <div

                ref={backgroundRef}
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px",
                    left: _baseGeo.left + "px"
                    , bottom: 0 + 'px',
                    pointerEvents: 'none'
                }}>
                <BaseImage
                    scale={2.2}
                    posInfo={{ l: -0.22, b: -0.1 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_g_bg.svg"} />

                <BaseDiv ref={aniObjectRef}>
                    <Player
                        ref={characterRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/jeepwithcharacterwheels.json'}
                        style={{
                            position: 'absolute',
                            width: '30%',
                            left: '10%',
                            bottom: '24%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>
                <ShadowComponent
                    posInfo={{
                        w: 0.08,
                        h: 0.16,
                        l: 0.53,
                        t: 0.77,

                    }}
                    intensity={0.2}
                />

                <ShadowComponent
                    posInfo={{
                        w: 0.08,
                        h: 0.16,
                        l: 0.63,
                        t: 0.775,

                    }}
                    intensity={0.2}
                />
                <BaseImage
                    url={'sb01/sb01_fg/sb01_fg_juice.svg'}
                    scale={0.8}
                    posInfo={{ r: 0, b: 0.00 }}
                />

                <BaseImage
                    url={'sb01/sb01_fg/sb01_fg_juice_charecter.svg'}
                    scale={0.4}
                    posInfo={{ r: 0.16, b: 0.12 }}
                />
            </div>

        </div>
    );
})
