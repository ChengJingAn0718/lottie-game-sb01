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


            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/w_b.mp3"
            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/w_g.mp3"

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

            backgroundRef.current.style.transition = '6s'
            backgroundRef.current.style.transform = ' translateX(-70%)'

            aniObjectRef.current.style.transition = '7s'
            aniObjectRef.current.style.transform = ' translateX(90%)'

            intervalList[0] = setInterval(() => {
                if (carSpeed < 0.7) {
                    carSpeed += 0.05
                }
                else {
                    carSpeed = 0.7
                    clearInterval(intervalList[0])
                }
                characterRef.current.setPlayerSpeed(carSpeed)
            }, 70);

            timerList[0] = setTimeout(() => {
                objectRef.current.play();
                audioList.bodyAudio1.play();
            }, 3500);



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


            }, 5500);

            timerList[2] = setTimeout(() => {
                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000


                characterRef.current.stop();

                backgroundRef.current.style.transition = '3s'
                backgroundRef.current.style.transform = ' translate(-120%, -25%) scale(1.5)'

                timerList[3] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);
            }, 7000);

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
        <div className="aniObject">
            <div ref={backgroundRef}
                style={{
                    position: "fixed", width: _baseGeo.width + "px",
                    height: _baseGeo.height + "px",
                    left: _baseGeo.left + "px"
                    , bottom: 0 + 'px',
                    pointerEvents: 'none'
                }}>
                <BaseImage
                    scale={2}
                    posInfo={{ l: -0.1, b: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_w_bg.svg"} />
                <BaseDiv ref={aniObjectRef}>
                    <Player
                        ref={characterRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/jeep_b_blink.json'}
                        style={{
                            position: 'absolute',
                            width: '40%',
                            left: '25%',
                            bottom: '20%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>
                <Player
                    ref={objectRef}
                    speed={0.6}
                    autoplay
                    loop
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_w_boy_eating_watermelon_1.json'}
                    style={{
                        position: 'absolute',
                        width: '60%',
                        left: '95%',
                        bottom: '-20%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>
        </div>
    );
})