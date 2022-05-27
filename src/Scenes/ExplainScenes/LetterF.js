import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl } from "../../components/CommonFunctions";
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

            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/f_b.mp3"
            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/f_g.mp3"

            // backgroundRef.current.style.transform = ' translate(-150%, -30%) scale(1.6)'

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
            backgroundRef.current.style.transform = ' translateX(-65%)'

            aniObjectRef.current.style.transition = '8s'
            aniObjectRef.current.style.transform = ' translateX(65%)'

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

            timerList[0] = setTimeout(() => {
                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                characterRef.current.stop();

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(-150%, -30%) scale(1.6)'

                timerList[1] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);

            }, 6000);

            timerList[2] = setTimeout(() => {
                objectRef.current.play();
            }, 6500);


            timerList[3] = setTimeout(() => {

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
            }, 7500);


            timerList[4] = setTimeout(() => {
                audioList.bodyAudio1.play();
            }, 9000);
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
                    posInfo={{ l: -0.2, b: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_f_bg.svg"} />

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
                            left: '5%',
                            bottom: '21%',
                            transform: 'rotateY(180deg)',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>


                <BaseImage
                    url={'sb01/sb01_fg/sb01_fg_frog.svg'}
                    scale={0.12}
                    posInfo={{ l: 1.4, b: 0.05 }}
                />

                <ShadowComponent
                    posInfo={{
                        w: 0.075,
                        h: 0.12,
                        l: 1.412,
                        t: 0.82,

                    }}
                    intensity={0.4}
                />

                <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    autoplay
                    loop
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_04_frog_1.json'}
                    style={{
                        position: 'absolute',
                        width: '10%',
                        left: '140.4%',
                        bottom: '9.5%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
})
