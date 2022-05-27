import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"


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

            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/n_g.mp3"
            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/n_b.mp3"

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
            objectRef.current.play()

            timerList[0] = setTimeout(() => {
                audioList.bodyAudio1.play();

                timerList[1] = setTimeout(() => {
                    audioList.bodyAudio2.play();
                    if (waitTime < audioList.bodyAudio2.duration * 1000)
                        waitTime = audioList.bodyAudio2.duration * 1000

                    backgroundRef.current.style.transition = '4s'
                    backgroundRef.current.style.transform = ' translate(-50%, 25%) scale(2)'

                    timerList[2] = setTimeout(() => {
                        nextFunc();
                    }, waitTime + 3000);
                }, 3000);
            }, 2500);


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
                    scale={2}
                    posInfo={{ r: -0.18, b: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_n_bg.svg"} />

                <BaseDiv ref={aniObjectRef}>
                    <Player
                        ref={characterRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/jeepwithcharacterwheels.json'}
                        style={{
                            position: 'absolute',
                            width: '35%',
                            left: '10%',
                            bottom: '20%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>

                <BaseImage
                    url={'sb01/sb01_fg/sb01_fg_nest.svg'}
                    scale={0.2}
                    posInfo={{ r: 0.13, b: 0.4 }}
                />
                <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    src={prePathUrl() + 'lottiefiles/main/scale/q_girl_boy.json'}
                    style={{
                        position: 'absolute',
                        width: '15%',
                        left: '20%',
                        bottom: '5%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
})
