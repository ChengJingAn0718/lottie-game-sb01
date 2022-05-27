import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { prePathUrl } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"

let timerList = []
let intervalList = []


let waitingTime = 3000

export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const characterRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();
    const objectRef = useRef();
    const basketBoys = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]

    useEffect(
        () => {

            audioList.bodyAudio2.src = prePathUrl() + "sounds/conversation/b_b.mp3"
            audioList.bodyAudio1.src = prePathUrl() + "sounds/conversation/b_g.mp3"

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
            aniObjectRef.current.style.transform = ' translateX(80%)'

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

            timerList[1] = setTimeout(() => {
                audioList.bodyAudio1.play();
            }, 3000);


            timerList[2] = setTimeout(() => {
                let count = 0;

                intervalList[2] = setInterval(() => {
                    basketBoys[count].current.setClass('hideObject')
                    if (count == 5)
                        count = 0
                    else
                        count++
                    basketBoys[count].current.setClass('showObject')

                }, 250);

            }, 6000);

            timerList[3] = setTimeout(() => {

                audioList.bodyAudio2.play();
                if (waitingTime < audioList.bodyAudio2.duration * 1000)
                    waitingTime = audioList.bodyAudio2.duration * 1000
                characterRef.current.stop();

                backgroundRef.current.style.transition = '3s'
                backgroundRef.current.style.transform = ' translate(-110%, 15%) scale(1.5)'

                timerList[4] = setTimeout(() => {
                    nextFunc();
                }, waitingTime + 3000);
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
                    posInfo={{ l: -0.25, t: 0.00 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_b_bg.svg"} />

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
                            bottom: '17%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>
                {
                    basketBoys.map((value, index) => <BaseImage
                        scale={0.8}
                        ref={basketBoys[index]}
                        posInfo={{ l: 0.6, b: 0 }}
                        className={index > 0 ? 'hideObject' : ''}
                        url={"sb01/ani/sb01_ball_f0" + (index + 1) + ".svg"}
                    />)

                }


                {/* <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_04_basketball_1.json'}
                    style={{
                        position: 'absolute',
                        width: '40%',
                        left: '100%',
                        top: '30%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player> */}
            </div>

        </div>
    );
})
