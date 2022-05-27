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
    const rainRefList = [useRef(), useRef(), useRef(), useRef()]

    useEffect(
        () => {


            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/u_b.mp3"
            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/u_g.mp3"


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
            rainRefList.map(rain => rain.current.play())
            objectRef.current.play()
            timerList[1] = setTimeout(() => {
                audioList.bodyAudio1.play();
                timerList[2] = setTimeout(() => {

                    audioList.bodyAudio2.play();
                    if (waitTime < audioList.bodyAudio2.duration * 1000)
                        waitTime = audioList.bodyAudio2.duration * 1000

                    backgroundRef.current.style.transition = '4s'
                    backgroundRef.current.style.transform = ' translate(-10%, -45%) scale(2)'

                    timerList[3] = setTimeout(() => {
                        nextFunc();
                    }, waitTime + 3000);
                }, 5000);

            }, 1500);

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
                    scale={2.3}
                    posInfo={{ r: -0.5, b: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_u_bg.svg"} />

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
                            transform: 'rotate(-4deg)',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>
                <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    src={prePathUrl() + 'lottiefiles/main/scale/u_boy_girl_umbrella.json'}
                    style={{
                        position: 'absolute',
                        width: '15%',
                        left: '50%',
                        bottom: '10%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
                {
                    [0, 1].map(value => {
                        return [0, 1].map(index =>

                            <Player
                                ref={rainRefList[value * 2 + index]}
                                loop
                                src={prePathUrl() + 'lottiefiles/main/scale/sb01_rain_animation_1.json'}
                                style={{
                                    position: 'absolute',
                                    width: '50%',
                                    left: 50 * value + '%',
                                    bottom: index * 50 + '%',
                                    pointerEvents: 'none',
                                    overflow: 'visible'
                                }}
                            >
                            </Player>)
                    })
                }


            </div>

        </div>
    );
})
