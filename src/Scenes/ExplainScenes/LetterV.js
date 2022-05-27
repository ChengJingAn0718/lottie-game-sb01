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

// not edtied voices........

export default React.forwardRef(function LetterExplain({ nextFunc, audioList, _geo, _baseGeo }, ref) {


    const carRef = useRef();
    const cycleRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();

    useEffect(
        () => {

            audioList.bodyAudio1.src = returnIntroPath('v1')
            audioList.bodyAudio2.src = returnIntroPath('v2')

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
            backgroundRef.current.style.transform = ' translateX(-65%)'

            aniObjectRef.current.style.transition = '9s'
            aniObjectRef.current.style.transform = ' translateX(70%)'

            intervalList[0] = setInterval(() => {
                if (carSpeed < 0.8) {
                    carSpeed += 0.05
                }
                else {
                    carSpeed = 0.8
                    clearInterval(intervalList[0])
                }

                carRef.current.setPlayerSpeed(carSpeed)
                cycleRef.current.setPlayerSpeed(carSpeed * 2)
            }, 70);


            timerList[0] = setTimeout(() => {
                audioList.bodyAudio1.play();
            }, 5500);

            timerList[1] = setTimeout(() => {
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

            timerList[2] = setTimeout(() => {

                carRef.current.stop();
                cycleRef.current.stop()
                backgroundRef.current.style.transition = '3s'
                backgroundRef.current.style.transform = ' translate(-125%, -20%) scale(1.5)'

                audioList.bodyAudio2.play();

                if (waitTime < audioList.bodyAudio2.duration * 1000)
                    waitTime = audioList.bodyAudio2.duration * 1000

                timerList[3] = setTimeout(() => {
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
                    posInfo={{ l: -0.1, b: 0 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_v_bg.svg"} />

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
                            bottom: '25%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>

                    .
                    <Player
                        ref={cycleRef}
                        loop
                        speed={0.0}
                        keepLastFrame={true}
                        src={prePathUrl() + 'lottiefiles/main/scale/c_bicycle.json'}
                        style={{
                            position: 'absolute',
                            width: '28%',
                            left: '10%',
                            bottom: '22%',
                            pointerEvents: 'none',
                            overflow: 'visible'
                        }}
                    >
                    </Player>
                </BaseDiv>


                <ShadowComponent
                    posInfo={{
                        w: 0.4,
                        h: 0.4,
                        l: 1.2,
                        t: 0.715,

                    }}
                    intensity={0.3}
                />
                <BaseImage
                    url={'sb01/sb01_fg/sb01_fg_van.svg'}
                    scale={0.4}
                    posInfo={{ l: 1.2, b: -0.03 }}
                />

            </div>

        </div>
    );
})
