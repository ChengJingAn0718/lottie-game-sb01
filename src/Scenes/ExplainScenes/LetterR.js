import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl, returnIntroPath } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"

let timerList = []
let intervalList = []

let waitTime = 4000

export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const carRef = useRef();
    const cycleRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();
    const objectRef = useRef();


    useEffect(
        () => {

            audioList.bodyAudio1.src = returnIntroPath('r1')
            audioList.bodyAudio2.src = returnIntroPath('r2')

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

            backgroundRef.current.style.transition = '8s'
            backgroundRef.current.style.transform = ' translate(-70%)'

            aniObjectRef.current.style.transition = '9s'
            aniObjectRef.current.style.transform = ' translate(90% ,-10%) '

            intervalList[0] = setInterval(() => {
                if (carSpeed < 0.7) {
                    carSpeed += 0.05
                }
                else {
                    carSpeed = 0.7
                    clearInterval(intervalList[0])
                }

                carRef.current.setPlayerSpeed(carSpeed)
                cycleRef.current.setPlayerSpeed(carSpeed * 2)
            }, 70);


            timerList[0] = setTimeout(() => {
                intervalList[1] = setInterval(() => {
                    if (carSpeed > 0) {
                        carSpeed -= 0.07
                    }
                    else {
                        carSpeed = 0
                        clearInterval(intervalList[1])
                    }
                    carRef.current.setPlayerSpeed(carSpeed)
                    cycleRef.current.setPlayerSpeed(carSpeed * 2)
                }, 50);

                
            }, 7500);

            timerList[4] = setTimeout(() => {
                audioList.bodyAudio1.play();
            }, 5000);

            timerList[1] = setTimeout(() => {

                audioList.bodyAudio2.play();
                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                carRef.current.stop();
                cycleRef.current.stop()
                backgroundRef.current.style.transition = '3s'
                backgroundRef.current.style.transform = ' translate(-125%, 15%) scale(2)'

                timerList[2] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);
            }, 9000);

            carRef.current.play();
            cycleRef.current.play();
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
                    scale={2.1}
                    posInfo={{ l: -0.25, b: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_k_bg.svg"} />

                <BaseDiv ref={aniObjectRef}>
                    <Player
                        ref={carRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/jeepwithcharacterwheels.json'}
                        style={{
                            position: 'absolute',
                            width: '35%',
                            left: '-35%',
                            bottom: '-2%',
                            pointerEvents: 'none',
                            overflow: 'visible',
                            transform: 'rotate(-5deg)'
                        }}
                    >
                    </Player>

                    <Player
                        ref={cycleRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/k,r,s_bicycle.json'}
                        style={{
                            position: 'absolute',
                            width: '28%',
                            left: '10%',
                            bottom: '0%',
                            pointerEvents: 'none',
                            transform: 'rotate(-5deg)',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>

                <BaseImage
                    scale={0.4}
                    posInfo={{ l: 0.91, b: 0.15 }}
                    url={"sb01/sb01_fg/sb01_fg_rainbow.svg"}
                />
            </div>

        </div>
    );
})
