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

    const characterRef = useRef();
    const backgroundRef = useRef();
    const aniObjectRef = useRef();
    const objectRef = useRef();


    useEffect(
        () => {

            audioList.bodyAudio1.src = returnIntroPath('q1')
            audioList.bodyAudio2.src = returnIntroPath('q2')

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
            objectRef.current.play()

            timerList[0] = setTimeout(() => {
                aniObjectRef.current.style.transition = '3s'
                aniObjectRef.current.style.transform = 'translate(-3%,6%) scale(1.15)'

                audioList.bodyAudio1.play();

                timerList[1] = setTimeout(() => {
                    audioList.bodyAudio2.play();

                    backgroundRef.current.style.transition = '4s'
                    backgroundRef.current.style.transform = ' translate(-20%, -30%) scale(1.6)'

                    timerList[2] = setTimeout(() => {

                        if (waitTime < audioList.bodyAudio2.duration * 1000)
                            waitTime = audioList.bodyAudio2.duration * 1000

                        timerList[3] = setTimeout(() => {
                            nextFunc();
                        }, waitTime + 3000);
                    }, 1500);
                }, 5000);
            }, 3000);
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
                    posInfo={{ r: -0.2, b: -0.1 }}
                    url={"sb01/sb01_bg/elxsi_sb01_y01_english_trace_q_bg.svg"} />

                <BaseDiv ref={aniObjectRef}>
                    <BaseImage
                        url={'sb01/sb01_fg/sb01_fg_queen.svg'}
                        scale={0.25}
                        posInfo={{ r: 0.23, b: 0.12 }}
                    />
                </BaseDiv>
                <div
                    style={{
                        position: 'absolute',
                        width: '15%',
                        height: '20%',
                        left: '15%',
                        bottom: '32.2%',
                        pointerEvents: 'none',
                        overflow: 'hidden',
                    }}
                >
                    <Player
                        ref={objectRef}
                        // keepLastFrame={true}
                        loop
                        speed={0.6}
                        src={prePathUrl() + 'lottiefiles/main/scale/q_girl_boy.json'}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            left: '0%',
                            top: '0%',
                            pointerEvents: 'none',
                        }}
                    >
                    </Player>
                </div>
            </div>

        </div>
    );
})
