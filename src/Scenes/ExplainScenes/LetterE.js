import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl, returnIntroPath } from "../../components/CommonFunctions";
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

            audioList.bodyAudio1.src = returnIntroPath('e1')
            audioList.bodyAudio2.src = returnVoicePath(4, '31')   //clap voice    

            // backgroundRef.current.style.transform = ' translate(-130%, -30%) scale(1.6)'

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
                audioList.bodyAudio1.play();
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

            timerList[1] = setTimeout(() => {
                // audioList.bodyAudio2.play();
                // if (waitTime < audioList.bodyAudio2.duration * 1000)
                //     waitTime = audioList.bodyAudio2.duration * 1000

                characterRef.current.stop();

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(-130%, -30%) scale(1.6)'

                timerList[2] = setTimeout(() => {
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
                    scale={1.8}
                    posInfo={{ l: -0.1, b: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_e_bg.svg"} />

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
                            bottom: '19%',
                            transform: 'rotateY(180deg)',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>

                <ShadowComponent
                    posInfo={{
                        w: 0.37,
                        h: 0.15,
                        l: 1.1,
                        t: 0.8,

                    }}
                    intensity={0.3}
                />

                <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    autoplay
                    loop
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_02_elephant.json'}
                    style={{
                        position: 'absolute',
                        width: '40%',
                        left: '110%',
                        bottom: '8%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
})
