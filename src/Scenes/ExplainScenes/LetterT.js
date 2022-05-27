import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { blinkFunc, prePathUrl, returnIntroPath, stopBlinkFunc } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"

let timerList = []
let intervalList = []

let waitTime = 4000
let eyeAniNum

export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const characterRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();

    const eyeListRef = [useRef(), useRef(), useRef(), useRef()]


    useEffect(
        () => {

            audioList.bodyAudio1.src = returnIntroPath('t1')
            audioList.bodyAudio2.src = returnIntroPath('t2')

            backgroundRef.current.style.transition = '0s'
            backgroundRef.current.style.transform = ' translateX(-85%)'


            eyeAniNum = blinkFunc(eyeListRef, 0, 3500)


            return () => {

                intervalList.map(interval => clearInterval(interval))
                timerList.map(timer => clearTimeout(timer))

                audioList.bodyAudio1.pause()
                audioList.bodyAudio2.pause()

                stopBlinkFunc(eyeAniNum)

            }
        }, []
    )

    React.useImperativeHandle(ref, () => ({
        playGame: () => {


            let carSpeed = 0

            backgroundRef.current.style.transition = '7s'
            backgroundRef.current.style.transform = ' translateX(-10%)'

            aniObjectRef.current.style.transition = '8s'
            aniObjectRef.current.style.transform = ' translateX(-60%)'

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

            timerList[4] = setTimeout(() => {
                audioList.bodyAudio1.play()
            }, 4500);

            timerList[1] = setTimeout(() => {
                characterRef.current.stop();
                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(25%, -35%) scale(1.8)'

                timerList[2] = setTimeout(() => {


                    timerList[3] = setTimeout(() => {
                        nextFunc();
                    }, waitTime + 3000);
                }, 1500);
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
                    , top: 0 + 'px',
                    pointerEvents: 'none'
                }}>
                <BaseImage
                    scale={2.25}
                    posInfo={{ l: -0.22, t: -0.05 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_l_bg.svg"} />

                <BaseDiv ref={aniObjectRef}>
                    <Player
                        ref={characterRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/rooftop_l_jeep.json'}
                        style={{
                            position: 'absolute',
                            width: '30%',
                            left: '140%',
                            top: '3%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>
                {/* <Player
                    ref={objectRef}
                    // keepLastFrame={true}
                    speed={0.6}
                    autoplay
                    loop
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_character_eye_blink_01_tiger.json'}
                    style={{
                        position: 'absolute',
                        width: '17%',
                        left: '22%',
                        top: '50%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player> */}

                
                <BaseImage
                    url={'sb01/ani/sb_37_ci_tiger_3.svg'}
                    scale={0.18}
                    posInfo={{ l: 0.18, b: 0.185 }}
                />
                {
                    Array.from(Array(4).keys()).map(
                        value =>
                            <BaseImage
                                ref={eyeListRef[value]}
                                url={'sb01/ani/sb_37_ci_tiger_3_eye_0' + (value + 1) + '.svg'}
                                scale={0.041}
                                posInfo={{ l: 0.191, b: 0.462 }}
                                className={value > 0 ? 'hideObject' : ''}
                            />
                    )


                }
            </div>


        </div>
    );
})
