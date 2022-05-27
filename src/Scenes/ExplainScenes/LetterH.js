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

            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/h_b.mp3"
            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/h_g.mp3"

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

            backgroundRef.current.style.transition = '9s'
            backgroundRef.current.style.transform = ' translateX(-65%)'

            aniObjectRef.current.style.transition = '10s'
            aniObjectRef.current.style.transform = ' translateX(110%)'

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
            }, 6000);

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


            }, 8500);

            timerList[2] = setTimeout(() => {
                audioList.bodyAudio2.play();
                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                characterRef.current.stop();

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(-130%, -15%) scale(1.6)'

                timerList[3] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);
            }, 10000);

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
                    posInfo={{ l: -0.15, b: -0.00 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_c_bg..svg"} />

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
                            left: '5%',
                            bottom: '26%',
                            // transform: 'rotateY(180deg)',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>

                <ShadowComponent
                    posInfo={{
                        w: 0.18,
                        h: 0.15,
                        l: 1.22,
                        t: 0.73,

                    }}
                    intensity={0.4}
                />

                <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    autoplay
                    loop
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_01_horse.json'}
                    style={{
                        position: 'absolute',
                        width: '23%',
                        left: '120%',
                        bottom: '18%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>
            </div>

        </div>
    );
})
