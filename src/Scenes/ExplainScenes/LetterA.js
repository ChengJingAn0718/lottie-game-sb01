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

            audioList.bodyAudio1.src = returnVoicePath(0, '01') //explain voice
            audioList.bodyAudio2.src = returnVoicePath(0, '02')   //clap voice    

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
            backgroundRef.current.style.transform = ' translateX(-50%)'

            aniObjectRef.current.style.transition = '7s'
            aniObjectRef.current.style.transform = ' translateX(77%)'

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


            }, 5500);

            timerList[2] = setTimeout(() => {
                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000
                characterRef.current.stop();

                backgroundRef.current.style.transition = '3s'
                backgroundRef.current.style.transform = ' translate(-155%, -70%) scale(2.4)'

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
                    scale={1.8}
                    posInfo={{ l: -0.1, t: 0.0 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_a_bg.svg"} />
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
                            left: '20%',
                            bottom: '22%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>
                <Player
                    ref={objectRef}
                    keepLastFrame={true}
                    speed={0.6}
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_02_ant_1.json'}
                    style={{
                        position: 'absolute',
                        width: '30%',
                        left: '105%',
                        bottom: '-14%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>
        </div>
    );
})