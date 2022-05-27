import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl, returnIntroPath } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"
import { ShadowComponent } from '../../components/CommonComponent';

let intervalList = []
let timerList = []

let waitTime = 4000

export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const characterRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();
    const objectRef = useRef();


    useEffect(
        () => {



            audioList.bodyAudio1.src = returnIntroPath('g1') //explain voice
            // audioList.bodyAudio2.src = returnIntroPath('g3')   //clap voice    

            backgroundRef.current.style.transition = '0s'
            backgroundRef.current.style.transform = ' translateX(-85%)'


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


            let carSpeed = 0

            backgroundRef.current.style.transition = '7s'
            backgroundRef.current.style.transform = ' translateX(0%)'

            aniObjectRef.current.style.transition = '8s'
            aniObjectRef.current.style.transform = ' translateX(-85%)'

            intervalList[0] = setInterval(() => {
                if (carSpeed < 0.4) {
                    carSpeed += 0.05
                }
                else {
                    carSpeed = 0.4
                    clearInterval(intervalList[0])
                }
                characterRef.current.setPlayerSpeed(carSpeed)
            }, 70);


            timerList[4] = setTimeout(() => {
                audioList.bodyAudio1.play();
            }, 4500);

            timerList[1] = setTimeout(() => {

                intervalList[1] = setInterval(() => {
                    if (carSpeed > 0) {
                        carSpeed -= 0.07
                    }
                    else {
                        carSpeed = 0
                        clearInterval(intervalList[1])
                    }
                    characterRef.current.setPlayerSpeed(carSpeed)
                }, 50);


            }, 6500);

            timerList[2] = setTimeout(() => {
                // audioList.bodyAudio2.play();
                // if (waitTime < audioList.bodyAudio2.duration * 1000)
                //     waitTime = audioList.bodyAudio2.duration * 1000

                characterRef.current.stop();

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(40%, -30%) scale(1.8)'

                timerList[3] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);
            }, 8000);

            characterRef.current.play();
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
                        src={prePathUrl() + 'lottiefiles/main/scale/rooftop_l_jeep.json'}
                        style={{
                            position: 'absolute',
                            width: '40%',
                            left: '140%',
                            bottom: '24%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>

                <ShadowComponent
                    posInfo={{
                        w: 0.11,
                        h: 0.14,
                        l: 0.13,
                        t: 0.79,

                    }}
                    intensity={0.4}
                />

                <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    autoplay
                    loop
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_01_goat.json'}
                    style={{
                        position: 'absolute',
                        width: '14%',
                        left: '10%',
                        bottom: '12%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
})
