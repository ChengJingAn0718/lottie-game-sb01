import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { pauseEnvirAni, playEnvirAni, prePathUrl, returnIntroPath } from "../../components/CommonFunctions";
import { Player } from '@lottiefiles/react-lottie-player';

import "../../stylesheets/styles.css";
import BaseImage from '../../components/BaseImage';
import { returnVoicePath } from "../../components/CommonFunctions"

let timerList = []
let intervalList = []

let waitTime = 4000

let aniNumList = []

export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const characterRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();

    const duckAniList = [
        [useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef()]
    ]


    useEffect(
        () => {

            audioList.bodyAudio1.src = returnIntroPath('d1') //explain voice
            audioList.bodyAudio2.src = returnIntroPath('d2')   //clap voice    


            return () => {
                intervalList.map(interval => clearInterval(interval))
                timerList.map(timer => clearTimeout(timer))

                audioList.bodyAudio1.pause()
                audioList.bodyAudio2.pause()
                aniNumList.map(value =>
                    pauseEnvirAni(value))
            }
        }, []
    )

    React.useImperativeHandle(ref, () => ({
        playGame: () => {


            aniNumList[0] = playEnvirAni(duckAniList[0], 200)
            aniNumList[1] = playEnvirAni(duckAniList[1], 200)
            let carSpeed = 0

            backgroundRef.current.style.transition = '5s'
            backgroundRef.current.style.transform = ' translateX(-30%)'

            aniObjectRef.current.style.transition = '6s'
            aniObjectRef.current.style.transform = ' translateX(30%)'

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
            }, 4500);

            timerList[1] = setTimeout(() => {
                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                characterRef.current.stop();

                backgroundRef.current.style.transition = '4s'
                backgroundRef.current.style.transform = ' translate(-100%, -30%) scale(1.6)'

                timerList[2] = setTimeout(() => {
                    nextFunc();
                }, waitTime + 3000);
            }, 6000);

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


                <Player
                    loop
                    autoplay
                    speed={0.0}
                    keepLastFrame={true}
                    src={prePathUrl() + 'lottiefiles/main/scale/sb01_duck_animation_1.json'}
                    style={{
                        position: 'absolute',
                        width: '13%',
                        left: '118%',
                        bottom: '1%',
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}
                >
                </Player>

                {
                    duckAniList[0].map((value, index) => <BaseImage
                        scale={0.08}
                        ref={duckAniList[0][index]}
                        posInfo={{ l: 1.12, b: 0.01 }}
                        className={index > 0 ? 'hideObject' : ''}
                        url={"sb01/ani/sb01_ci_duckling_01_f" + (index + 1) + ".svg"}
                    />)
                }
                {
                    duckAniList[1].map((value, index) => <BaseImage
                        scale={0.08}
                        ref={duckAniList[1][index]}
                        posInfo={{ l: 1.05, b: 0.03 }}
                        className={index > 0 ? 'hideObject' : ''}
                        url={"sb01/ani/sb01_ci_duckling_02_f" + (index + 1) + ".svg"}
                    />)
                }
            </div>

        </div>
    );
})
